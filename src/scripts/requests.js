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
      console.log(getVerifyUser.is_admin);
      if (!getVerifyUser.is_admin) {
        window.location.replace("../Pages/homeUser.html");
      } else if (getVerifyUser.is_admin) {
        window.location.replace("../Pages/homeAdmin.html");
      }
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
      window.location.replace("../Pages/login.html");
    }
  } catch (err) {
    console.log(err);
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

export async function getUserData(){
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try{

    const request = await fetch(baseUrl + "users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`
      }
    })

    const response = request.json()
    return response

  }catch(err){
    console.log(err);
  }
}


