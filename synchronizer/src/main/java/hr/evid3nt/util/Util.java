package hr.evid3nt.util;

import hr.evid3nt.dto.TelemetryDTO;
import org.thingsboard.server.common.data.kv.TsKvEntry;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Util {

    public static Map<Long, TelemetryDTO> createTelemetryDTOMapFromTimeseries(List<TsKvEntry> telemetry) {
        Map<Long, TelemetryDTO> map = new HashMap<>();

        for (TsKvEntry entry : telemetry) {
            long ts = entry.getTs();
            TelemetryDTO telemetryDTO = map.getOrDefault(ts, new TelemetryDTO(ts));
            telemetryDTO.setFromTsKvEntry(entry);
            map.putIfAbsent(ts, telemetryDTO);
        }

        return map;
    }
}
