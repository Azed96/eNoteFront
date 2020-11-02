/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import LoginProf from "views/examples/LoginProf.js";
import LoginEtudiant from "views/examples/LoginEtudiant.js";
import MatiereEnseignant from "views/examples/MatiereEnseignant.js";
import ListeEtudiantMariere from "views/examples/ListeEtudiantMariere";
//:::::::::::::::::::Etudiant:::::::::::::::::::::
import ListeEtudiant from "views/examples/Etudiant/ListeEtudiantComponent";
import CreateEtudiant from"views/examples/Etudiant/CreateEtudiant.Component";
import ViewEtudiantComponent from"views/examples/Etudiant/ViewEtudiantComponent";

//:::::::::::::::::::FILIERE:::::::::::::::::::::
import ListeFiliereComponent from"views/examples/Filiere/ListeFiliereComponent";
import CreateFiliereComponent from"views/examples/Filiere/CreateFiliereCompnent";
import ViewFiliereComponent from"views/examples/Filiere/ViewFiliereComponent";

//:::::::::::::::::::Matiere:::::::::::::::::::::
import ListeMatiereComponent from"views/examples/Matiere/ListeMatiereComponent";
import CreateMatiereCompnent from"views/examples/Matiere/CreateMatiereCompnent";
import ViewMatiereComponent from"views/examples/Matiere/ViewMatiereComponent";

//:::::::::::::::::::Prod:::::::::::::::::::::
import ListeProfComponent from"views/examples/Prof/ListeProfComponent";
import CreateProfComponent from"views/examples/Prof/CreateProfComponent";
import ViewProfComponent from"views/examples/Prof/ViewProfComponent";



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/administrateur"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/administrateur"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/logprof",
    name: "Professeur",
    icon: "ni ni-circle-08 text-pink",
    component: LoginProf,
    layout: "/auth"
  },
  {
    path: "/logetudiant",
    name: "Etudiant",
    icon: "ni ni-circle-08 text-pink",
    component: LoginEtudiant,
    layout: "/auth"
  },
  {
    path: "/mesmatiere",
    name: "Mes Matiéres",
    icon: "ni ni-book-bookmark blue",
    component: MatiereEnseignant,
    layout: "/admin"
  },
  {
    path: "/etudiant-matiere/:id",
    name: "Liste d'étudiant",
    icon: "ni ni-bullet-list-67 text-green",
    component: ListeEtudiantMariere,
    layout: "/admin"
  },
  {
    path: "/allEtudiant",
    name: "Liste des étudiants",
    icon: "ni ni-bullet-list-67 text-purple",
    component: ListeEtudiant,
    layout: "/administrateur"
  },
  {
    path: "/add-update-Etudiant/:id",
    name: "créer un étudiant",
    icon: "ni ni-circle-08 text-red",
    component: CreateEtudiant,
    layout: "/administrateur"
  },
  {
    path: "/ViewEtudiant/:id",
    name: "Edite étudiant",
    icon: "ni ni-badge text-green",
    component: ViewEtudiantComponent,
    layout: "/administrateur"
  },
  {
    path: "/allFiliere",
    name: "Liste des filieres",
    icon: "ni ni-bullet-list-67 text-purple",
    component: ListeFiliereComponent,
    layout: "/administrateur"
  },
  {
    path: "/add-update-filiere/:id",
    name: "créer une filiere",
    icon: "ni ni-circle-08 text-red",
    component: CreateFiliereComponent,
    layout: "/administrateur"
  },
  {
    path: '/ViewFiliereComponent/:id',
    name: "Edite étudiant",
    icon: "ni ni-badge text-green",
    component: ViewFiliereComponent,
    layout: "/administrateur"
  },
  {
    path: "/allMatiere",
    name: "Liste des matiéres",
    icon: "ni ni-bullet-list-67 text-purple",
    component: ListeMatiereComponent,
    layout: "/administrateur"
  },
  {
    path: "/add-update-matiere/:id",
    name: "créer une matiere",
    icon: "ni ni-circle-08 text-red",
    component: CreateMatiereCompnent,
    layout: "/administrateur"
  },
  {
    path: '/ViewMatiereComponent/:id',
    name: "Edite matiére",
    icon: "ni ni-badge text-green",
    component: ViewMatiereComponent,
    layout: "/administrateur"
  },
  {
    path: "/allProf",
    name: "Liste des profs",
    icon: "ni ni-bullet-list-67 text-purple",
    component: ListeProfComponent,
    layout: "/administrateur"
  },
  {
    path: "/add-update-Prof/:id",
    name: "créer un prof",
    icon: "ni ni-circle-08 text-red",
    component: CreateProfComponent,
    layout: "/administrateur"
  },
  {
    path: '/viewProf/:id',
    name: "Edite matiére",
    icon: "ni ni-badge text-green",
    component: ViewProfComponent,
    layout: "/administrateur"
  }
  



  
];
export default routes;
