"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SessionExpiredModal = ({ show }: { show: boolean }) => {
    const router = useRouter();
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        setVisible(show);
    }, [show]);


    if (!visible) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Session Expired</h2>
                <p className="mb-6 text-gray-700">Do you want to login again?</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        onClick={() => {
                            localStorage.clear();
                            router.push("/auth/login");
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={() => setVisible(false)}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionExpiredModal;
