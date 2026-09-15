# Background jobs

BullMQ and Redis are planned for social refreshes and notifications. Add a worker entry point when the first job is implemented. Define payload validation, bounded retries, idempotency and failed-job handling alongside each job. Financial events require a durable database record before acknowledgement.
