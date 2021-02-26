import { useEffect, useState } from "react";

interface RequestInit {
  headers: any;
  method: "PUT" | "POST" | "GET";
  body: string;
}

export const useFetch = ({
  url,
  options,
  control
}: {
  url: string;
  options: RequestInit;
  control: {load:boolean,nomore:boolean}
  }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const doFetch = async () => {
      if(control.load)
        setLoading(true);

      if (control.nomore)
        return null;

      try {
        const res = await fetch(url, options);
        const json = await res.json();
        if (!signal.aborted) {
          setResponse(json);
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(e);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    doFetch();
    return () => {
      abortController.abort();
    };
  }, [options]);
  return { response, error, loading };
};
