(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{34:function(e,t,n){},4:function(e,t){e.exports={getUser:function(){var e=sessionStorage.getItem("user");return"undefined"!==e&&e?JSON.parse(e):null},getToken:function(){return sessionStorage.getItem("token")},setUserSession:function(e,t){sessionStorage.setItem("user",JSON.stringify(e)),sessionStorage.setItem("token",t)},resetUserSession:function(){sessionStorage.removeItem("user"),sessionStorage.removeItem("token")}}},62:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n.n(s),r=n(28),c=n.n(r),i=(n(34),n(8)),o=n(11),u=n(2),j=n(1),b=function(){return Object(j.jsx)("div",{children:"This is the home page!"})},O=n(13),p=n.n(O),l=function(){var e=Object(s.useState)(""),t=Object(i.a)(e,2),n=t[0],a=t[1],r=Object(s.useState)(""),c=Object(i.a)(r,2),o=c[0],u=c[1],b=Object(s.useState)(""),O=Object(i.a)(b,2),l=O[0],m=O[1],d=Object(s.useState)(""),x=Object(i.a)(d,2),h=x[0],g=x[1],v=Object(s.useState)(null),f=Object(i.a)(v,2),y=f[0],S=f[1];return Object(j.jsxs)("div",{children:[Object(j.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),""!==l.trim()&&""!==o.trim()&&""!==n.trim()&&""!==h.trim()){S(null);var t={username:l,email:o,name:n,password:h};p.a.post("https://3y1aczstgg.execute-api.us-east-1.amazonaws.com/prod/register",t,{headers:{"x-api-key":"iyO28j4UFf1oqazrpQAJF7iw9QQnrN4U1V4xXPUO"}}).then((function(e){S("Registeration Successful")})).catch((function(e){401===e.response.status?S(e.response.data.message):S("sorry....the backend server is down!! please try again later")}))}else S("All fields are required")},children:[Object(j.jsx)("h5",{children:"Register"}),"name: ",Object(j.jsx)("input",{type:"text",value:n,onChange:function(e){return a(e.target.value)}})," ",Object(j.jsx)("br",{}),"email: ",Object(j.jsx)("input",{type:"text",value:o,onChange:function(e){return u(e.target.value)}})," ",Object(j.jsx)("br",{}),"username: ",Object(j.jsx)("input",{type:"text",value:l,onChange:function(e){return m(e.target.value)}})," ",Object(j.jsx)("br",{}),"password: ",Object(j.jsx)("input",{type:"text",value:h,onChange:function(e){return g(e.target.value)}})," ",Object(j.jsx)("br",{}),Object(j.jsx)("input",{type:"submit",value:"Register"})]}),y&&Object(j.jsx)("p",{className:"message",children:y})]})},m=n(4),d=function(e){var t=Object(s.useState)(""),n=Object(i.a)(t,2),a=n[0],r=n[1],c=Object(s.useState)(""),o=Object(i.a)(c,2),u=o[0],b=o[1],O=Object(s.useState)(null),l=Object(i.a)(O,2),d=l[0],x=l[1];return Object(j.jsxs)("div",{children:[Object(j.jsxs)("form",{onSubmit:function(t){if(t.preventDefault(),""!==a.trim()&&""!==u.trim()){x(null);var n={username:a,password:u};p.a.post("https://3y1aczstgg.execute-api.us-east-1.amazonaws.com/prod/login",n,{headers:{"x-api-key":"iyO28j4UFf1oqazrpQAJF7iw9QQnrN4U1V4xXPUO"}}).then((function(t){Object(m.setUserSession)(t.data.user,t.data.token),e.history.push("/premium-content")})).catch((function(e){401===e.response.status||403===e.response.status?x(e.response.data.message):x("sorry....the backend server is down. please try again later!!")}))}else x("Both username and password are required")},children:[Object(j.jsx)("h5",{children:"Login"}),"username: ",Object(j.jsx)("input",{type:"text",value:a,onChange:function(e){return r(e.target.value)}})," ",Object(j.jsx)("br",{}),"password: ",Object(j.jsx)("input",{type:"password",value:u,onChange:function(e){return b(e.target.value)}})," ",Object(j.jsx)("br",{}),Object(j.jsx)("input",{type:"submit",value:"Login"})]}),d&&Object(j.jsx)("p",{className:"message",children:d})]})},x=function(e){var t=Object(m.getUser)(),n="undefined"!==t&&t?t.name:"";return Object(j.jsxs)("div",{children:["Hello ",n,"! You have been loggined in!!!! Welcome to the premium content. ",Object(j.jsx)("br",{}),Object(j.jsx)("input",{type:"button",value:"Logout",onClick:function(){Object(m.resetUserSession)(),e.history.push("login")}})]})},h=n(12),g=n(15),v=["component"],f=function(e){var t=e.component,n=Object(g.a)(e,v);return Object(j.jsx)(u.b,Object(h.a)(Object(h.a)({},n),{},{render:function(e){return Object(m.getToken)()?Object(j.jsx)(u.a,{to:{pathname:"/premium-content"}}):Object(j.jsx)(t,Object(h.a)({},e))}}))},y=["component"],S=function(e){var t=e.component,n=Object(g.a)(e,y);return Object(j.jsx)(u.b,Object(h.a)(Object(h.a)({},n),{},{render:function(e){return Object(m.getToken)()?Object(j.jsx)(t,Object(h.a)({},e)):Object(j.jsx)(u.a,{to:{pathname:"/login"}})}}))};var k=function(){var e=Object(s.useState)(!0),t=Object(i.a)(e,2),n=t[0],a=t[1];Object(s.useEffect)((function(){var e=Object(m.getToken)();if("undefined"!==e&&void 0!==e&&null!==e&&e){var t={user:Object(m.getUser)(),token:e};p.a.post("https://3y1aczstgg.execute-api.us-east-1.amazonaws.com/prod/verify",t,{headers:{"x-api-key":"iyO28j4UFf1oqazrpQAJF7iw9QQnrN4U1V4xXPUO"}}).then((function(e){Object(m.setUserSession)(e.data.user,e.data.token),a(!1)})).catch((function(){Object(m.resetUserSession)(),a(!1)}))}}),[]);var r=Object(m.getToken)();return n&&r?Object(j.jsx)("div",{className:"content",children:"Authenicating..."}):Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(o.a,{children:[Object(j.jsxs)("div",{className:"header",children:[Object(j.jsx)(o.b,{exact:!0,activeClassName:"active",to:"/",children:"Home"}),Object(j.jsx)(o.b,{activeClassName:"active",to:"/register",children:"Register"}),Object(j.jsx)(o.b,{activeClassName:"active",to:"/login",children:"Login"}),Object(j.jsx)(o.b,{activeClassName:"active",to:"/premium-content",children:"Premium Content"})]}),Object(j.jsx)("div",{className:"content",children:Object(j.jsxs)(u.d,{children:[Object(j.jsx)(u.b,{exact:!0,path:"/",component:b}),Object(j.jsx)(f,{path:"/register",component:l}),Object(j.jsx)(f,{path:"/login",component:d}),Object(j.jsx)(S,{path:"/premium-content",component:x})]})})]})})};c.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(k,{})}),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.4f94aab4.chunk.js.map