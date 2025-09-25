import { GetMetricsUseCase } from "./get-metrics";
import { MetricsRepository } from "@domain/repositories/metrics";
import { PeriodMetricsDTO } from "@application/dtos/metrics/get-metrics";

describe("GetMetricsUseCase", () => {
  let getMetricsUseCase: GetMetricsUseCase;
  let metricsRepository: MetricsRepository;

  const mockMetrics30Days: PeriodMetricsDTO = {
    total_raised: 1000,
    new_donors: 10,
    recurring_donations: 5,
    total_donations: 15,
    average_ticket: 66.66
  };

  const mockMetrics365Days: PeriodMetricsDTO = {
    total_raised: 30000,
    new_donors: 200,
    recurring_donations: 100,
    total_donations: 350,
    average_ticket: 85.71
  };

  beforeEach(() => {
    metricsRepository = {
      getMetrics: jest.fn()
    } as unknown as MetricsRepository;

    getMetricsUseCase = new GetMetricsUseCase(metricsRepository);
  });

  it("should return metrics for last 30 and 365 days", async () => {
    (metricsRepository.getMetrics as jest.Mock)
      .mockImplementationOnce(async (days: number) => {
        expect(days).toBe(30);
        return mockMetrics30Days;
      })
      .mockImplementationOnce(async (days: number) => {
        expect(days).toBe(365);
        return mockMetrics365Days;
      });

    const result = await getMetricsUseCase.execute();

    expect(result).toEqual({
      last_30_days: mockMetrics30Days,
      last_365_days: mockMetrics365Days
    });

    expect(metricsRepository.getMetrics).toHaveBeenCalledTimes(2);
  });
});
