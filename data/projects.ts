export const projects = [
  {
    key: "xai-av",
    title: "Explainable Autonomous Vehicles Project (Jinbo Bi's HealthInfoLab with Danny, UConn)",
    oneLiner:
      "Engineering-driven XAI pipeline for autonomous driving: saliency maps, multimodal data annotation, and web demo integration.",
    links: [
      { label: "XAI", href: "https://chefbaker4.github.io/AV-Saliency-Explainer/" },
    ],
    details: [
      "Built saliency-map pipelines using YOLOv11 and Gaussian heatmaps to highlight decision-relevant regions in driving scenes.",
      "Prepared and annotated multimodal datasets by adding saliency highlights and writing ground-truth explanations to support training/evaluation of saliency-aware captioning.",
      "Built the project's initial GitHub webpage; collaborated on Flask + Supabase backend development and integrated backend outputs into the deployed web app (UI built by another undergraduate).",
    ],
    timeframe: "Mar 2025 - Nov 2025",
  },
  {
    key: "3d-mesh",
    title: "3D Mesh Generation from Image & Text (Senior Design)",
    oneLiner:
      "Next.js frontend + system integration for an image/text-to-3D mesh demo with an interactive OBJ viewer.",
    links: [
      { label: "Live Demo", href: "https://sdp52-3d-mesh-generation.vercel.app/" },
      { label: "MeshGithub", href: "https://github.com/BEN-GZF/SDP_team_52_demo_test" },
    ],
    details: [
      "Developed the Next.js front-end interface, including image upload, gallery display, and an interactive 3D OBJ viewer for mesh visualization.",
      "Designing the system architecture to connect the front end to a Flask/GPU backend for diffusion-based text-to-image and image-to-3D reconstruction models.",
      "Implementing API routes and UI components to integrate upcoming LRM / Gaussian Splatting outputs once backend services are deployed.",
    ],
    timeframe: "Sep 2025 - Present",
  },
  {
    key: "benbot",
    title: "Personal Website & BenBot (Chatbot)",
    oneLiner:
      "Minimal personal site + an embedded agent that answers questions about my background with grounded, linkable sources.",
    links: [
      { label: "GitHub", href: "https://github.com/BEN-GZF" },
    ],
    details: [
      "Migrating my personal website from Hugo to Next.js for better customization and a modern component-based UI.",
      "Designing BenBot with a React frontend and a Google Gemini backend to answer questions about my background and projects.",
      "Experimenting with retrieval-augmented generation (RAG) to support grounded and personalized responses after deployment.",
    ],
    timeframe: "Aug 2025 - Present",
  },
  {
    key: "world-model",
    title: "World Model Dataset & Representation Learning Exploration",
    oneLiner:
      "Early-stage multimodal data pipelines and representation learning exploration inspired by JEPA-style world models.",
    links: [
      { label: "GitHub", href: "https://github.com/BEN-GZF" },
    ],
    details: [
      "Implemented early-stage data pipelines for generating multimodal samples (image, heatmap, caption, audio).",
      "Designing architectures for future latent-prediction modules inspired by JEPA-style world models.",
    ],
    timeframe: "Nov 2025 - Present",
  },
];
