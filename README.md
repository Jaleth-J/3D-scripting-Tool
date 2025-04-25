# 🎬 3D Scene Scripting Tool

The **3D Scene Scripting Tool** is a web-based 3D editor that enables users to build and visualize scenes using a simple, text-based scripting language.  
It is designed with clarity, accessibility, and creative freedom in mind — making 3D creation approachable even for those without prior technical or artistic experience.

> This project serves both as a functional tool and a showcase of our capabilities in frontend development, 3D graphics, UI/UX design, and software architecture.

---

## 🚀 Purpose & Vision

The tool was originally conceived to solve a specific creative problem:  
**How can someone with no prior 3D modeling knowledge quickly prototype ideas for animations, games, or interactive scenes?**

Our answer is a highly intuitive and visually responsive environment powered by plain-text commands.

> The ultimate goal is to grow this tool into a **platform for interactive storytelling**, educational use cases, or even rapid prototyping in production pipelines.

---

## ✨ Features Overview

### ✅ Core Functionality

- **Text-Based Command Input**  
  Write natural DSL commands to create and manipulate objects.
  ```txt
  CREATE CUBE SIZE 1 1 1;
  NAME CUBE Box1;
  POSITION Box1 2 0 0;
  COLOR Box1 BLUE;

    Scene Rendering with Three.js
    Render objects in real-time using the WebGL-based Three.js engine.

    Export Scene as JSON
    Save and share your creations for use in other tools or continued development.

    Toggleable UI Controls

        Grid visibility (📐)

        Free camera control (🎮)

        Show/hide object labels (🏷️)

    Command History Log
    Keep track of all previous commands to revisit or reuse them.

🧱 Technical Stack
Technology	Role
HTML5	UI layout
CSS3	Styling with a modern, dark theme
JavaScript (ESM)	Application logic
Three.js	Real-time 3D rendering
Import Maps	Modular script management
Google Fonts	Developer-friendly font (Fira Code)
🧑‍🎨 User Experience Design

The interface follows a split-layout design:

    Left Side: Command input, scrollable command history, and execution buttons

    Right Side: 3D canvas with a 2:1 ratio for immersive scene editing

    Bottom Section (Planned): Storyboard panel with image + annotation export

🎨 Color Scheme

    #1a1a1a — Main background

    #ff4e28 — Interactive highlights

    #eeeeee, gold — For contrast and readability

🔭 Features in Development

We're actively expanding the tool’s functionality with:
💡 Advanced Lighting Support

    Adjustable intensity and color temperature via commands like:

    INTENSITY Light1 0.8;
    KELVIN Light1 3500;

    Positionable SPOT and SUN light sources

🌳 Custom Prefabs

    BAUM: Tree composed of trunk + foliage

    HUMAN: Stick figure representing a character

🎞️ Storyboard Mode

Export screenshots from specific camera views along with a captioned description, building up a visual scene progression.
💾 Enhanced File Export

    .png – Snapshot of the current camera view

    .json – Full scene export

    (Planned) .glb – 3D model export

📘 Example Use Case

A user could use this tool to:

    Create a virtual forest with TUBE trees and a PLANE ground.

    Hide a SPHERE character behind one of the trees.

    Use camera controls to find the hidden object.

    Export the final view as a storyboard panel.

This is useful for:

    Storyboarding

    Scene planning

    Game design sketches

    Creative coding education

🎓 What This Project Demonstrates

This project is a living demonstration of our ability to:

    Design and implement interactive web tools from scratch

    Work with WebGL and 3D concepts in the browser

    Build clean, scalable architectures

    Combine UX, development, and creative problem solving

    Think ahead to productization (export formats, modular commands, etc.)



