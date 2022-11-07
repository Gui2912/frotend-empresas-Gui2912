import { toast } from "./toast.js";

const baseUrl = "http://localhost:6278/";

export async function getVerifyAdm() {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "auth/validate_user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function postLogin(body) {
  try {
    const request = await fetch(baseUrl + "auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let response = "";

    if (request.ok) {
      response = await request.json();

      localStorage.setItem("token", JSON.stringify(response));
      let getVerifyUser = await getVerifyAdm();
      toast(
        "sucess",
        "Login feito com sucesso!!!",
        "Você será redirecionado em breve"
      );
      setTimeout(() => {
        if (!getVerifyUser.is_admin) {
          window.location.replace("../Pages/homeUser.html");
        } else if (getVerifyUser.is_admin) {
          window.location.replace("../Pages/homeAdmin.html");
        }
      }, 2000);
    } else {
      toast("Fail", "Algo deu errado", "Verifique o e-mail e a senha");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function postRegister(body) {
  try {
    const request = await fetch(baseUrl + "auth/register", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(body),
    });

    const response = await request.json();
    if (response) {
      toast(
        "sucess",
        "Usuário criado com sucesso!!!",
        "Você será redirecionado em breve, aguarde"
      );
      setTimeout(() => {
        window.location.replace("../Pages/login.html");
      }, 2000);
    } else {
      toast(
        "fail",
        "Usuário criado com sucesso!!!",
        "Você será redirecionado em breve, aguarde"
      );
    }
  } catch (err) {
    console.log(err);
    toast(
      "fail",
      "Usuário criado com sucesso!!!",
      "Você será redirecionado em breve, aguarde"
    );
  }
}

export async function getAllCompanys() {
  try {
    const request = await fetch(baseUrl + "companies");
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllCompanysSectors() {
  try {
    const request = await fetch(baseUrl + "sectors");
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllDepartaments() {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllEmployees() {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function postCreateDepartament(body) {
  const token = JSON.parse(localStorage.getItem("token")) || "";

  try {
    const request = await fetch(baseUrl + "departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function patchEditUser(body) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserData() {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDepartament(uuid) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "departments/" + uuid, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(uuid) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "admin/delete_user/" + uuid, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function adminEditUser(uuid, body) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "admin/update_user/" + uuid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getDepartamentsId(uuid) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "departments/" + uuid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getOutOfWork() {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "admin/out_of_work", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function patchHire(body) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "departments/hire/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function patchEditDepartament(uuid, body) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "departments/" + uuid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function patchDismiss(uuid) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "departments/dismiss/" + uuid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getCoWork() {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "users/departments/coworkers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllDeps() {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const request = await fetch(baseUrl + "users/departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}
