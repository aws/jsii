def test_stop_closes_all_pipes() -> None:
    """Stopping the kernel process must close all pipes to the node child, so
    that interpreter exit does not emit ResourceWarnings.
    """
    import jsii_calc  # noqa: F401  # starts the kernel's node child
    from jsii._kernel.providers.process import _NodeProcess

    # Use a fresh process so stopping it does not affect other tests.
    proc = _NodeProcess()
    proc.start()
    proc.stop()

    process = proc._process
    assert process.stdin is not None and process.stdin.closed
    assert process.stdout is not None and process.stdout.closed
    assert process.stderr is not None and process.stderr.closed
