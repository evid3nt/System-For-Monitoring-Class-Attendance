package hr.evid3nt;


import hr.evid3nt.config.DefaultAppConfig;
import hr.evid3nt.config.IAppConfig;

import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}


class Synchronizer {
    private final IAppConfig appConfig = new DefaultAppConfig();

    public void setup() {

    }

    public void loop() {

    }

    public static Synchronizer of() {
        return null;
    }
}
