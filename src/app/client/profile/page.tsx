'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PublicHeader from '@/components/layout/PublicHeader';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.ezlegalhire.com';

interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  isVerified: boolean;
  provider?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export default function ClientProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ClientData>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password change state
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const token = localStorage.getItem('clientToken');
    const storedData = localStorage.getItem('clientData');

    if (!token) {
      router.push('/client/login');
      return;
    }

    // First load from localStorage for immediate display
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setClientData(parsed);
        setEditForm(parsed);
      } catch (e) {
        console.error('Error parsing stored data:', e);
      }
    }

    // Then try to fetch fresh data from API
    try {
      const response = await fetch(`${API_BASE_URL}/api/public/client/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.client) {
          // Merge with existing data (keep provider info from localStorage)
          const mergedData = {
            ...clientData,
            ...data.client,
            provider: clientData?.provider || data.client.provider,
          };
          setClientData(mergedData);
          setEditForm(mergedData);
          // Update localStorage with fresh data
          localStorage.setItem('clientData', JSON.stringify(mergedData));
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Keep using localStorage data if API fails
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!clientData) return;

    setSaving(true);
    setMessage(null);

    const token = localStorage.getItem('clientToken');
    if (!token) {
      router.push('/client/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/public/client/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          phone: editForm.phone,
          address: editForm.address,
          city: editForm.city,
          country: editForm.country,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedData = { ...clientData, ...editForm, ...data.client };
        setClientData(updatedData);
        localStorage.setItem('clientData', JSON.stringify(updatedData));
        window.dispatchEvent(new Event('storage'));
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // For Google users without backend support, just update localStorage
      if (clientData.provider === 'google') {
        const updatedData = { ...clientData, ...editForm };
        setClientData(updatedData);
        localStorage.setItem('clientData', JSON.stringify(updatedData));
        window.dispatchEvent(new Event('storage'));
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Profile updated locally!' });
      } else {
        setMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'Failed to update profile'
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }

    setChangingPassword(true);
    setMessage(null);

    const token = localStorage.getItem('clientToken');
    if (!token) {
      router.push('/client/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/public/client/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordSection(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to change password'
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const cancelEdit = () => {
    setEditForm(clientData || {});
    setIsEditing(false);
    setMessage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PublicHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return null;
  }

  const isGoogleUser = clientData.provider === 'google';

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Back Button */}
          <Link href="/client/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p className={`text-sm ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {message.text}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white text-center">
                  {clientData.avatarUrl ? (
                    <img
                      src={clientData.avatarUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/30"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                      <span className="text-3xl font-bold">
                        {clientData.firstName?.[0]}{clientData.lastName?.[0]}
                      </span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold">
                    {clientData.firstName} {clientData.lastName}
                  </h2>
                  <p className="text-white/80 text-sm mt-1">{clientData.email}</p>

                  {/* Verification Badge */}
                  <div className={`inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    clientData.isVerified
                      ? 'bg-green-500/20 text-green-100'
                      : 'bg-yellow-500/20 text-yellow-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      clientData.isVerified ? 'bg-green-300' : 'bg-yellow-300'
                    }`}></div>
                    {clientData.isVerified ? 'Verified Account' : 'Pending Verification'}
                  </div>

                  {/* Provider Badge */}
                  {isGoogleUser && (
                    <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-white/10 rounded-full text-xs">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Signed in with Google
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Member since {clientData.createdAt
                      ? new Date(clientData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      : 'Recently'
                    }</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Personal Information</h3>
                      <p className="text-sm text-gray-500">Update your personal details</p>
                    </div>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.firstName || ''}
                          onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                          {clientData.firstName || '-'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.lastName || ''}
                          onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                          {clientData.lastName || '-'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center justify-between">
                      {clientData.email}
                      {isGoogleUser && (
                        <span className="text-xs text-gray-500">Managed by Google</span>
                      )}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                        {clientData.phone || 'Not provided'}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.address || ''}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        placeholder="Street address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                        {clientData.address || 'Not provided'}
                      </p>
                    )}
                  </div>

                  {/* City & Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.city || ''}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          placeholder="Dubai"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                          {clientData.city || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.country || ''}
                          onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                          placeholder="United Arab Emirates"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                          {clientData.country || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Section - Only for non-Google users */}
              {!isGoogleUser && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Security</h3>
                        <p className="text-sm text-gray-500">Manage your password</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPasswordSection(!showPasswordSection)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Lock className="w-4 h-4" />
                      {showPasswordSection ? 'Cancel' : 'Change Password'}
                    </button>
                  </div>

                  {showPasswordSection && (
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.current ? 'text' : 'password'}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? 'text' : 'password'}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleChangePassword}
                        disabled={changingPassword || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                        className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {changingPassword ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Changing Password...
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Google Account Info */}
              {isGoogleUser && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Google Account</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your account is linked to Google. Your email and password are managed by your Google account.
                        To change your password, please visit your Google account settings.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
