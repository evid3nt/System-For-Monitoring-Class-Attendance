package hr.evid3nt.dto;

import org.thingsboard.server.common.data.kv.TsKvEntry;

import java.time.Instant;

public class TelemetryDTO {
    private String cardId;
    private final Instant scanTime;
    private String classroom;

    public TelemetryDTO(long ts) {
        scanTime = Instant.ofEpochMilli(ts);
    }

    public void setFromTsKvEntry(TsKvEntry entry) {
        String key = entry.getKey();
        if (key.equals("cardId")) {
            cardId = entry.getValueAsString();
        } else if (key.equals("classroom")) {
            classroom = entry.getValueAsString();
        }
    }

    public String getCardId() {
        return cardId;
    }

    public Instant getScanTime() {
        return scanTime;
    }

    public String getClassroom() {
        return classroom;
    }

    @Override
    public String toString() {
        return "TelemetryDTO{" +
                "cardId='" + cardId + '\'' +
                ", scanTime=" + scanTime +
                ", classroom='" + classroom + '\'' +
                '}';
    }
}
