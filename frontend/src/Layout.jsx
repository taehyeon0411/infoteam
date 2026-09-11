import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Outlet } from "react-router-dom";
import './Layout.css';


export default function Layout() {
    return (
        <div className="app">
              <Header/> 
              <div className="main"> {/* 메인 화면을 의미함 - 분류창, 검색창, 검색 내부 분류창, 하단 게시글 창*/}
                <Outlet />
              </div>
              <Footer/>
        </div>
    );
}