// Login.js
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../api";
import useAuth from "../../hooks/useAuth";
import { showToast } from "../../lib/notify";
import logo from "./../../assets/logo_luve.svg";
import "./styles.css";

type FormValues = {
  username: string;
  password: string;
};

function Login() {
  const { isAuthenticated, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badCredentials, setBadCredentials] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      showToast("Sesiín activa...", "success", "✅");
      navigate("/admin");
    }
  }, [isAuthenticated, loading, navigate]);

  const onFinish = async (values: FormValues) => {
    console.log("on finish...");
    try {
      const result = await AuthAPI.login({
        username: values.username,
        password: values.password,
      });
      if (result.access_token) {
        window.location.href = "/admin";
      } else setBadCredentials(true);
      console.log("result LOGIN", result);
    } catch (err) {
      setBadCredentials(true);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400 bg-gradient">
      <div className="z-10 px-8 py-3 bg-white shadow-md rounded-2xl">
        <Form name="login" className="login-form" onFinish={onFinish}>
          <div className="flex justify-center self-stretch">
            <img
              className="mb-10"
              style={{ maxWidth: "100%" }}
              src={logo}
              width={300}
            />
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu correo electrónico!",
              },
            ]}>
            <Input placeholder="Correo electrónico" />
          </Form.Item>
          <Form.Item
            className={badCredentials ? "mb-0" : ""}
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu contraseña!",
              },
            ]}>
            <Input.Password placeholder="Contraseña" />
          </Form.Item>
          {badCredentials ? (
            <div className="text-red-500 text-center mb-1 mt-3">
              Las credenciales que has proporcionado no son válidas
            </div>
          ) : null}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              style={{ backgroundColor: "#44b44a" }}>
              Iniciar Sesión
            </Button>
          </Form.Item>
          <div className="flex flex-col items-center self-stretch mb-3 mt-5">
            <div className="w-10/12 text-center">
              <span>
                ¿Tienes problemas para acceder? Por favor envía un correo a
              </span>
              <span> </span>
              <a
                className="underline text-blue-500 hover:underline"
                href="mailto:esau.egs1@gmail.com">
                esau.egs1@gmail.com
              </a>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
