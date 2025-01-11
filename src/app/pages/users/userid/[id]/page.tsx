"use client";

import { useState, useEffect } from "react";
import { getUserId } from "@/services/user";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

interface User {
  name: string;
  email: string;
}

const UserId = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserId();
        setUser(res);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {error ? (
          <div className="text-red-600 text-center font-semibold">{error}</div>
        ) : !user ? (
          <div className="text-gray-600 text-center font-medium">
            Loading...
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Nome: {user.name}
            </h1>
            <p className="text-gray-600 pb-10">Email: {user.email}</p>

            <Link href="/pages/users/edituser/1">
              <Button
                type="submit"
                width="full"
                variant="solid"
                colorScheme="green"
                className="transition-all hover:opacity-80"
                color="white"
                backgroundColor="green.700"
              >
                Editar Usuário
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserId;
