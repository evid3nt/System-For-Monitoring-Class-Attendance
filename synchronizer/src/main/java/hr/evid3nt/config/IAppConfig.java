package hr.evid3nt.config;

public interface IAppConfig {
    // ThingsBoard
    String tbHost();
    int tbPort();
    String tbUsername();
    String tbPassword();
    int tbFetchPageSize();
    String tbDeviceType();

    // Database
    String dbHost();
    int dbPort();
    String dbUsername();
    String dbPassword();
    String dbName();

    // Application
    int poolSize();
    String env();
    String loggerConfig();

    int syncTaskRepeatInterval();
    int syncTaskSyncInterval();

}
