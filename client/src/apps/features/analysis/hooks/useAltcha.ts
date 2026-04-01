import useAnalysisSessionStore from "@analysis/stores/AnalysisSessionStore";

export function useAltcha() {
    const {
        setAnalysisSessionToken,
        setAnalysisCaptchaError
    } = useAnalysisSessionStore();

    return async function execute() {
        setAnalysisSessionToken("local-analysis");
        setAnalysisCaptchaError(undefined);
    };
}
