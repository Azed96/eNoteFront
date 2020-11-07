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
import EspaceEtudiant from "views/examples/EspaceEtudiant";
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
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/monespace",
    name: "Espace Etudiant",
    icon: "ni ni-circle-08 text-pink",
    component: EspaceEtudiant,
    layout: "/etudiant"
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
    name: "Créer un étudiant",
    icon: "ni ni-ruler-pencil text-red",
    component: CreateEtudiant,
    layout: "/administrateur"
  },
  {
    path: "/ViewEtudiant/:id",
    name: "Consulter un étudiant",
    icon: "ni ni-badge text-green",
    component: ViewEtudiantComponent,
    layout: "/administrateur"
  },
  {
    path: "/allFiliere",
    name: "Liste des filieres",
    icon: "ni ni-archive-2 text-yellow",
    component: ListeFiliereComponent,
    layout: "/administrateur"
  },
  {
    path: "/add-update-filiere/:id",
    name: "Créer une filiere",
    icon: "ni ni-box-2",
    component: CreateFiliereComponent,
    layout: "/administrateur"
  },
  {
    path: '/ViewFiliereComponent/:id',
    name: "Consulter une filière",
    icon: "ni ni-badge text-cyan",
    component: ViewFiliereComponent,
    layout: "/administrateur"
  },
  {
    path: "/allMatiere",
    name: "Liste des matiéres",
    icon: "ni ni-books text-blue",
    component: ListeMatiereComponent,
    layout: "/administrateur"
  },
  {
    path: "/add-update-matiere/:id",
    name: "Créer une matiere",
    icon: "ni ni-briefcase-24 text-aero",
    component: CreateMatiereCompnent,
    layout: "/administrateur"
  },
  {
    path: '/ViewMatiereComponent/:id',
    name: "Consulter une matiére",
    icon: "ni ni-collection text-info",
    component: ViewMatiereComponent,
    layout: "/administrateur"
  },
  {
    path: "/allProf",
    name: "Liste des enseignants",
    icon: "ni ni-bullet-list-67 text-purple",
    component: ListeProfComponent,
    layout: "/administrateur"
  },
  {
    path: "/add-update-Prof/:id",
    name: "Créer un enseignant",
    icon: "ni ni-circle-08 text-red",
    component: CreateProfComponent,
    layout: "/administrateur"
  },
  {
    path: '/ViewProf/:id',
    name: "Consulter un enseignant",
    icon: "ni ni-badge text-green",
    component: ViewProfComponent,
    layout: "/administrateur"
  }
  



  
];
export default routes;
