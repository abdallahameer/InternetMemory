"use client";

import { useState } from "react";
import axios from "axios";

interface UsePostResponse<T> {
  loading: boolean;
  error: string | null;
  post: (data: any) => Promise<T>;
}

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const fetcher = async (url: string) => {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const usePost = <T>(endpoint: string): UsePostResponse<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (data: any): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<T>(endpoint, data);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, post };
};

interface UsePatchResponse<T> {
  loading: boolean;
  error: string | null;
  patch: (endpoint: string, data: any) => Promise<T>;
}

const usePatch = <T = void>(): UsePatchResponse<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = async (endpoint: string, data: any = {}): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch<T>(endpoint, data);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, patch };
};

interface UseDeleteResponse {
  loading: boolean;
  error: string | null;
  delete: (endpoint: string) => Promise<void>;
}

const useDelete = (): UseDeleteResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRequest = async (endpoint: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(endpoint);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || err.message || "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, delete: deleteRequest };
};

export { usePost, usePatch, useDelete, fetcher };
