import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../Layouts/DefaultLayout";
import { ClientsList, ClientsManage } from "../pages/Clients";
import { ClientsHeader } from "../pages/Clients/Common/ClientsHeader";
import NotFound from "../pages/Errors/NotFound";
import {
  FormAssignationsList,
  FormAssignationsManage,
} from "../pages/FormAssignation";
import { FormAssignationsHeader } from "../pages/FormAssignation/Common/FormAssignationHeader";
import { Home } from "../pages/Home";
import { HomeHeader } from "../pages/Home/HomeHeader";
import { LoanFieldsList, LoanFieldsManage } from "../pages/LoanFields";
import { LoanFieldsHeader } from "../pages/LoanFields/Common/LoanFieldsHeader";
import { LoanFormsList, LoanFormsManage } from "../pages/LoanForms";
import { LoanFormsHeader } from "../pages/LoanForms/Common/LoanFormsHeader";
import Login from "../pages/Login/Login";
import { ProfilesList, ProfilesManage } from "../pages/Profiles";
import { ProfilesHeader } from "../pages/Profiles/Common/ProfilesHeader";
import { UsersManage } from "../pages/Users";
import { UsersHeader } from "../pages/Users/Common/UsersHeader";
import { UsersList } from "../pages/Users/List/UsersList";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { routesList } from "./routes";

const router = createBrowserRouter([
  {
    path: routesList.login.path,
    element: <Login />,
  },
  {
    path: routesList.admin.path,
    element: (
      <ProtectedRoute
        element={
          <DefaultLayout navContent={<HomeHeader />} headerTitle="Inicio">
            <Home />
          </DefaultLayout>
        }
      />
    ),
  },
  {
    path: routesList.loanForms.path,
    element: (
      <DefaultLayout navContent={<LoanFormsHeader />} headerTitle="Formularios">
        <LoanFormsList />
      </DefaultLayout>
    ),
  },
  {
    path: `${routesList.loanFormsManage.path}/:id?`,
    element: (
      <DefaultLayout navContent={<LoanFormsHeader />} headerTitle="Formularios">
        <LoanFormsManage />
      </DefaultLayout>
    ),
  },
  {
    path: routesList.formAssignations.path,
    element: (
      <DefaultLayout
        navContent={<FormAssignationsHeader />}
        headerTitle="Asignacion de formulario">
        <FormAssignationsList />
      </DefaultLayout>
    ),
  },
  {
    path: `${routesList.formAssignationsManage.path}/:id?`,
    element: (
      <DefaultLayout
        navContent={<FormAssignationsHeader />}
        headerTitle="Asignacion de formulario">
        <FormAssignationsManage />
      </DefaultLayout>
    ),
  },
  {
    path: routesList.loanFields.path,
    element: (
      <DefaultLayout
        navContent={<LoanFieldsHeader />}
        headerTitle="Campos de formularios">
        <LoanFieldsList />
      </DefaultLayout>
    ),
  },
  {
    path: `${routesList.loanFieldsManage.path}/:id?`,
    element: (
      <DefaultLayout
        navContent={<LoanFieldsHeader />}
        headerTitle="Campos de formularios">
        <LoanFieldsManage />
      </DefaultLayout>
    ),
  },
  {
    path: routesList.users.path,
    element: (
      <DefaultLayout navContent={<UsersHeader />} headerTitle="Usuarios">
        <UsersList />
      </DefaultLayout>
    ),
  },
  {
    path: `${routesList.usersManage.path}/:id?`,
    element: (
      <DefaultLayout navContent={<UsersHeader />} headerTitle="Usuarios">
        <UsersManage />
      </DefaultLayout>
    ),
  },
  {
    path: routesList.profiles.path,
    element: (
      <DefaultLayout navContent={<ProfilesHeader />} headerTitle="Perfiles">
        <ProfilesList />
      </DefaultLayout>
    ),
  },
  {
    path: `${routesList.profilesManage.path}/:id?`,
    element: (
      <DefaultLayout navContent={<ProfilesHeader />} headerTitle="Perfiles">
        <ProfilesManage />
      </DefaultLayout>
    ),
  },
  {
    path: routesList.clients.path,
    element: (
      <DefaultLayout navContent={<ClientsHeader />} headerTitle="Perfiles">
        <ClientsList />
      </DefaultLayout>
    ),
  },
  {
    path: `${routesList.clientsManage.path}/:id?`,
    element: (
      <DefaultLayout navContent={<ClientsHeader />} headerTitle="Perfiles">
        <ClientsManage />
      </DefaultLayout>
    ),
  },
  {
    path: "*",
    element: (
      <DefaultLayout headerTitle="El recurso no se encontro...">
        <NotFound />
      </DefaultLayout>
    ),
  },
]);

export default router;
