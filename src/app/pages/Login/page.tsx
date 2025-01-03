"use client";

import Cookies from "js-cookie";

// CHAKRA UI
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

//SERVICES
import { LoginAdmin } from "@/services/auth";

// HOOKS
import { useState } from "react";

export default function CreatePost() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setIsLoading(true);

    try {
      const data = await LoginAdmin({ email, password });
      Cookies.set("token", data.token, { expires: 1 });
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center flex-col bg-white py-44">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
      >
        <Fieldset.Root size="lg" maxW="md" color="green.700">
          <Stack>
            <Fieldset.Legend className="text-2xl font-semibold text-green-700">
              Entrar
            </Fieldset.Legend>
          </Stack>

          <Fieldset.Content>
            <Field label="Email">
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira o email"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>

            <Field label="Senha">
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                border="1px solid #ddd"
                placeholder="Insira a senha"
                padding="1rem"
                _placeholder={{ color: "gray.400" }}
              />
            </Field>
          </Fieldset.Content>

          <Button
            type="submit"
            alignSelf="flex-start"
            marginTop="1rem"
            width="100%"
            backgroundColor="green.800"
            color="white"
            border="1px solid green.950"
            className="hover:opacity-80"
          >
            Entrar
          </Button>
        </Fieldset.Root>

        <Stack marginTop="1rem">
          {success && (
            <Alert status="success" title="Login feito com sucesso!"></Alert>
          )}
          {error && (
            <Alert
              status="error"
              title="Erro ao fazer login, tente novamente mais tarde."
            ></Alert>
          )}
        </Stack>
      </form>
    </div>
  );
}
