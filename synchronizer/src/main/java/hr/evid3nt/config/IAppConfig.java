package hr.evid3nt.config;

public interface IAppConfig {
    // ThingsBoard
    String tbHost();
    int tbPort();
    String tbUsername();
    String tbPassword();

    // Database
    String dbHost();
    int dbPort();
    String dbName();

    // Application
    int poolSize();

}
