import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const LanguageContext = createContext();

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: { translation: require('./i18n/translations/en.json') },
      es: { translation: require('./i18n/translations/es.json') },
      zh: { translation: require('./i18n/translations/zh.json') },
    },
    react: {
      useSuspense: false,
    },
  });

export const LanguageProvider = ({ children }) => {
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [displayLanguage, setDisplayLanguage] = useState('native'); // 'native' or 'target'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguagePreferences();
  }, []);

  const loadLanguagePreferences = async () => {
    try {
      const [storedNative, storedTarget, storedDisplay] = await Promise.all([
        AsyncStorage.getItem('@native_language'),
        AsyncStorage.getItem('@target_language'),
        AsyncStorage.getItem('@display_language'),
      ]);

      setNativeLanguage(storedNative || Localization.locale.split('-')[0]);
      setTargetLanguage(storedTarget || 'en');
      setDisplayLanguage(storedDisplay || 'native');
      
      // Set initial app language
      const initialLanguage = storedDisplay === 'target' ? storedTarget : storedNative;
      await i18n.changeLanguage(initialLanguage || Localization.locale.split('-')[0]);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading language preferences:', error);
      setIsLoading(false);
    }
  };

  const updateLanguagePreferences = async (newNative, newTarget, newDisplay) => {
    try {
      await Promise.all([
        AsyncStorage.setItem('@native_language', newNative),
        AsyncStorage.setItem('@target_language', newTarget),
        AsyncStorage.setItem('@display_language', newDisplay),
      ]);

      setNativeLanguage(newNative);
      setTargetLanguage(newTarget);
      setDisplayLanguage(newDisplay);

      // Update app language based on display preference
      const newDisplayLanguage = newDisplay === 'target' ? newTarget : newNative;
      await i18n.changeLanguage(newDisplayLanguage);

      return true;
    } catch (error) {
      console.error('Error saving language preferences:', error);
      return false;
    }
  };

  const value = {
    nativeLanguage,
    targetLanguage,
    displayLanguage,
    updateLanguagePreferences,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};