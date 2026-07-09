import type { CSSProperties } from "react";

type TechnologyStyle = {
    backgroundColor: string;
    borderColor: string;
    color: string;
};

const TECHNOLOGY_STYLES: Record<string, TechnologyStyle> = {
    terraform: {
        backgroundColor: "rgba(155, 110, 255, 0.18)",
        borderColor: "rgba(155, 110, 255, 0.42)",
        color: "#efe6ff",
    },
    azure: {
        backgroundColor: "rgba(46, 130, 246, 0.18)",
        borderColor: "rgba(46, 130, 246, 0.42)",
        color: "#e8f2ff",
    },
    aws: {
        backgroundColor: "rgba(255, 153, 0, 0.18)",
        borderColor: "rgba(255, 153, 0, 0.42)",
        color: "#fff1db",
    },
    react: {
        backgroundColor: "rgba(97, 218, 251, 0.18)",
        borderColor: "rgba(97, 218, 251, 0.42)",
        color: "#e0fbff",
    },
    typescript: {
        backgroundColor: "rgba(49, 120, 198, 0.18)",
        borderColor: "rgba(49, 120, 198, 0.42)",
        color: "#e7f1ff",
    },
    "c# .net webapi": {
        backgroundColor: "rgba(142, 68, 173, 0.18)",
        borderColor: "rgba(142, 68, 173, 0.42)",
        color: "#f5ebff",
    },
    html: {
        backgroundColor: "rgba(230, 81, 0, 0.18)",
        borderColor: "rgba(230, 81, 0, 0.42)",
        color: "#ffebe0",
    },
    css: {
        backgroundColor: "rgba(21, 101, 192, 0.18)",
        borderColor: "rgba(21, 101, 192, 0.42)",
        color: "#e3f2fd",
    },
    php: {
        backgroundColor: "rgba(121, 134, 203, 0.18)",
        borderColor: "rgba(121, 134, 203, 0.42)",
        color: "#e8eaf6",
    },
    sql: {
        backgroundColor: "rgba(0, 150, 136, 0.18)",
        borderColor: "rgba(0, 150, 136, 0.42)",
        color: "#e0f2f1",
    },
    linux: {
        backgroundColor: "rgba(241, 196, 15, 0.15)",
        borderColor: "rgba(241, 196, 15, 0.35)",
        color: "#fffdf0",
    },
    "c++": {
        backgroundColor: "rgba(0, 89, 156, 0.18)",
        borderColor: "rgba(0, 89, 156, 0.42)",
        color: "#e6f4ff",
    },
    android: {
        backgroundColor: "rgba(61, 220, 132, 0.15)", 
        borderColor: "rgba(61, 220, 132, 0.38)",
        color: "#e6ffe6",
    },
    kotlin: {
        backgroundColor: "rgba(241, 101, 41, 0.18)",
        borderColor: "rgba(242, 78, 122, 0.42)",
        color: "#fff0eb",
    },
    unity: {
        backgroundColor: "rgba(0, 188, 212, 0.15)", 
        borderColor: "rgba(0, 188, 212, 0.45)",     
        color: "#e0f7fa",                            
    },
    "c#": {
        backgroundColor: "rgba(115, 36, 134, 0.18)",
        borderColor: "rgba(115, 36, 134, 0.42)",
        color: "#fae6ff",
    },
    opengl: {
        backgroundColor: "rgba(224, 43, 43, 0.16)",
        borderColor: "rgba(224, 43, 43, 0.42)",     
        color: "#ffebee",                            
    },
    powershell: {
        backgroundColor: "rgba(1, 36, 86, 0.35)",   
        borderColor: "rgba(0, 120, 215, 0.5)",      
        color: "#e1f5fe",                          
    },
    github: {
        backgroundColor: "rgba(240, 246, 252, 0.1)", 
        borderColor: "rgba(240, 246, 252, 0.35)",   
        color: "#f0f6fc",                           
    },
    gitlab: {
        backgroundColor: "rgba(252, 109, 38, 0.15)", 
        borderColor: "rgba(252, 109, 38, 0.42)",    
        color: "#fff3e0",                           
    },
    "ci/cd": {
        backgroundColor: "rgba(0, 230, 118, 0.14)",  
        borderColor: "rgba(0, 230, 118, 0.4)",     
        color: "#e8f5e9",                            
    },
    slack: {
        backgroundColor: "rgba(74, 21, 75, 0.22)",  
        borderColor: "rgba(224, 30, 90, 0.45)",    
        color: "#fbe4ec",                       
    },
    pipedream: {
        backgroundColor: "rgba(0, 163, 255, 0.15)", 
        borderColor: "rgba(0, 163, 255, 0.42)",   
        color: "#e1f5fe",                            
    },
    notion: {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.35)",  
        color: "#ffffff",                          
    },
    // ---------------------
    default: {
        backgroundColor: "rgba(148, 163, 184, 0.16)",
        borderColor: "rgba(148, 163, 184, 0.3)",
        color: "#f8fafc",
    },
};

export function getTechnologyBadgeStyle(technology: string): CSSProperties {
    const normalizedTechnology = technology.trim().toLowerCase().replace(/\s+/g, "");
    const style = TECHNOLOGY_STYLES[normalizedTechnology] ?? TECHNOLOGY_STYLES.default;

    return {
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        color: style.color,
    };
}