const PageSpinner = () => {
    return (
        <div
            className="flex justify-center items-center h-screen"
            role="status"
            aria-live="polite"
        >
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-t-transparent"
                style={{ borderTopColor: 'transparent' }}
            ></div>
            <span className="sr-only">Page is loading, please wait...</span>
        </div>
    );
}

export default PageSpinner;
