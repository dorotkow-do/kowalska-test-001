# kowalska-test-001

This is a test project for Playwright using TypeScript. It uses the Sauce Demo website as the target for testing.

## CI/CD

The project contains a scratch of a Dockerfile for running tests in CI/CD pipelines.

## Monitoring, Alerting and Observability

It is a good practice to automate error alerts. In my last project, I used Playwright scripts running in Betterstack Uptime to monitor the health of the website, with notifications sent to Slack (it repeated till the issue was acknowledged). We can also create packages of test results that can be used in dashboards like Grafana.
For testers, it is important to monitor test suite health to eliminate flaky scripts, spot third-party dependencies and track real errors. Grouping errors by browser or device is also a good idea.

## What to automate

. risk, business impact, frequency of use
. workload (manual testing vs script creating and maintaining it)
. stability of the application
. environment restrictions
. Playwright has wide possiblities, butI prefer to automate e2e with Playwright, and keep performance testing as simple as possible to avoid additional layers impact the results.

## Installation

Playwright should be installed in the project directory. Assuming you have Node.js and npm installed:
```bash
npm init playwright@latest
```

## Running tests

```bash
npx playwright test
```

## Running tests in headed mode
```bash
npx playwright test --headed
```