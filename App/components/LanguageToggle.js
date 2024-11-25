export const LanguageToggle = () => {
    const { displayLanguage, nativeLanguage, targetLanguage, updateLanguagePreferences } = useLanguage();
    const { t } = useTranslation();
  
    const toggleDisplayLanguage = () => {
      const newDisplay = displayLanguage === 'native' ? 'target' : 'native';
      updateLanguagePreferences(nativeLanguage, targetLanguage, newDisplay);
    };
  
    return (
      <TouchableOpacity 
        onPress={toggleDisplayLanguage}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleText}>
          {t('language.displayIn', { 
            language: displayLanguage === 'native' ? t('language.native') : t('language.target') 
          })}
        </Text>
      </TouchableOpacity>
    );
  };