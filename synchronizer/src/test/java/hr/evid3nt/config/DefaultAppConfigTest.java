package hr.evid3nt.config;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class DefaultAppConfigTest {
    private DefaultAppConfig defaultAppConfig;

    @Test
    void getAllPropertiesTest() {
        defaultAppConfig = new DefaultAppConfig("app-test.properties");
        assertDoesNotThrow(() -> defaultAppConfig.tbHost());
        assertDoesNotThrow(() -> defaultAppConfig.tbPort());
        assertDoesNotThrow(() -> defaultAppConfig.tbUsername());
        assertDoesNotThrow(() -> defaultAppConfig.tbPassword());
        assertDoesNotThrow(() -> defaultAppConfig.dbHost());
        assertDoesNotThrow(() -> defaultAppConfig.dbPort());
        assertDoesNotThrow(() -> defaultAppConfig.dbName());
        assertDoesNotThrow(() -> defaultAppConfig.poolSize());
    }

    @Test
    void throwRuntimeExceptionWhenInvalidFileName() {
        assertThrows(RuntimeException.class, () -> new DefaultAppConfig("invalid.properties"));
    }
}