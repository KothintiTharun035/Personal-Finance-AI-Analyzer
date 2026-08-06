package com.financeai.service;

import java.util.Map;

public interface DashboardService {

    Map<String, Object> getDashboardSummary(String userId);

}