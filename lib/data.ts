export const HISTORY = [
  {
    year: '2024 — Present',
    role: 'Founder & Managing Partner',
    company: 'Sovereign Capital',
    description: 'Allocating capital to early-stage deep tech and decentralized infrastructure. Actively incubating two stealth startups in the edge compute space, focusing on zero-knowledge proofs and local LLM orchestration.'
  },
  {
    year: '2021 — 2024',
    role: 'Lead Systems Architect',
    company: 'Distributed Networks Inc.',
    description: 'Led a team of 15 engineers building a high-throughput, low-latency consensus engine. Scaled the network to 10,000+ globally distributed nodes, reducing block finality time by 40% through novel mempool optimizations.'
  },
  {
    year: '2018 — 2021',
    role: 'Core Developer',
    company: 'Open Source Foundation',
    description: 'Contributed to major open-source cryptography libraries. Implemented zero-knowledge proof verification circuits used by millions of clients, and maintained core networking modules for peer-to-peer discovery.'
  }
];

export const THESES = [
  { 
    id: '01', 
    title: 'Intelligence at the Edge', 
    desc: 'Moving compute and inference to local devices will fundamentally alter privacy, latency, and user agency. The next generation of applications will not rely on centralized API calls, but on sovereign, on-device models. This shift reduces the attack surface for data breaches and democratizes access to high-performance AI, regardless of network connectivity. We are investing heavily in the infrastructure that makes this possible: model quantization, efficient edge runtimes, and specialized silicon.' 
  },
  { 
    id: '02', 
    title: 'Aesthetic as a Moat', 
    desc: 'In a world of infinite software supply and AI-generated code, uncompromising design and visceral UX are the only sustainable differentiators. Beauty is a leading indicator of technical rigor. When a product feels perfectly tuned, it signals that the underlying architecture is equally robust. We back founders who obsess over micro-interactions, typography, and motion, understanding that these details are not superficial—they are the core of user retention and brand loyalty.' 
  },
  { 
    id: '03', 
    title: 'Sovereign Infrastructure', 
    desc: 'Decentralized protocols that enable permissionless value transfer and compute will underpin the next web. We are moving from rented platforms to owned networks. This transition requires a new stack of primitives: decentralized identity, zero-knowledge proofs for verifiable computation, and robust peer-to-peer networking. By removing central points of failure and rent-seeking intermediaries, we unlock entirely new economic models for creators and developers.' 
  },
  {
    id: '04',
    title: 'Synthetic Biology & Compute',
    desc: 'The intersection of computational modeling and biological engineering is reaching an inflection point. By applying machine learning to protein folding, genomic sequencing, and cellular simulation, we can treat biology as an engineering discipline. This convergence will yield breakthroughs in therapeutics, sustainable materials, and longevity. We look for teams bridging the gap between wet labs and dry labs, building the software infrastructure that accelerates biological discovery.'
  }
];

export const WORKS = [
  { 
    id: '01', 
    slug: 'synapse',
    name: 'SYNAPSE', 
    role: 'Founder & Lead Engineer', 
    type: 'AI Infrastructure', 
    year: '2026',
    tagline: 'Decentralized inference for the edge.',
    overview: 'Synapse is a protocol designed to run large language models across a distributed mesh of consumer devices. By utilizing WebGPU and novel sharding algorithms, we reduced reliance on centralized data centers, ensuring zero-knowledge privacy and 80% lower latency for local inference tasks. The platform allows developers to deploy AI features without the massive overhead of cloud GPU instances.',
    approach: 'The architecture required a complete rethink of how transformer layers are loaded into memory. We built a custom orchestration layer in Rust, compiled to WebAssembly, to manage the peer-to-peer distribution of model weights. This involved creating a bespoke gossip protocol that dynamically routes compute tasks to the most capable nodes in the network, handling node churn and network partitions gracefully.',
    techStack: ['Rust', 'WebGPU', 'WebAssembly', 'P2P Networking'],
    images: [
      'https://picsum.photos/seed/abstract-dark/1920/1080?grayscale',
      'https://picsum.photos/seed/tech-mesh/1920/1080?grayscale'
    ]
  },
  { 
    id: '02', 
    slug: 'void',
    name: 'VOID', 
    role: 'Angel Investor', 
    type: 'Spatial Computing', 
    year: '2025',
    tagline: 'The operating system for mixed reality.',
    overview: 'Void is building the foundational interaction layer for spatial computing. Moving beyond 2D planes, Void introduces volumetric interfaces that respond to eye-tracking and micro-gestures. The system provides developers with a unified SDK to build immersive applications that seamlessly blend digital objects with the physical environment, handling occlusion, lighting, and physics automatically.',
    approach: 'As an early backer, I worked closely with the founding team to refine their initial go-to-market strategy and helped design the core physics engine that governs how digital objects interact with physical environments. We focused heavily on reducing motion-to-photon latency, optimizing the rendering pipeline to ensure a nausea-free experience even during rapid head movements.',
    techStack: ['C++', 'Vulkan', 'Computer Vision', 'Spatial Audio'],
    images: [
      'https://picsum.photos/seed/glass-lens/1920/1080?grayscale',
      'https://picsum.photos/seed/spatial-grid/1920/1080?grayscale'
    ]
  },
  { 
    id: '03', 
    slug: 'kinetic',
    name: 'KINETIC', 
    role: 'Advisor', 
    type: 'Robotics', 
    year: '2026',
    tagline: 'Fluid dynamics for humanoid actuation.',
    overview: 'Kinetic is pioneering a new class of synthetic muscle fibers for humanoid robotics. Their proprietary actuators offer 10x the power density of traditional electric motors while maintaining organic, fluid movement. This breakthrough enables robots to perform delicate tasks with human-like dexterity, while also possessing the strength required for heavy industrial applications.',
    approach: 'I advise the team on software architecture, specifically the real-time control systems required to process sensor data and translate it into micro-adjustments for the actuators. We implemented a novel reinforcement learning framework that allows the robots to learn complex motor skills in simulation before transferring those policies to the physical hardware.',
    techStack: ['Python', 'ROS', 'Embedded C', 'Reinforcement Learning'],
    images: [
      'https://picsum.photos/seed/fluid-metal/1920/1080?grayscale',
      'https://picsum.photos/seed/robotic-joint/1920/1080?grayscale'
    ]
  },
  { 
    id: '04', 
    slug: 'aether',
    name: 'AETHER', 
    role: 'Lead Designer', 
    type: 'Decentralized Compute', 
    year: '2024',
    tagline: 'The marketplace for idle GPU cycles.',
    overview: 'Aether connects data centers and consumer GPUs into a unified, permissionless compute cluster. It allows AI researchers to train models at a fraction of the cost of traditional cloud providers. By tokenizing compute resources, Aether creates a liquid market where supply and demand dictate pricing in real-time, maximizing hardware utilization globally.',
    approach: 'I led the design of the core protocol interface, translating complex cryptographic proofs and compute metrics into a visceral, consumer-grade dashboard that abstracted away the underlying blockchain mechanics. The challenge was to make a highly technical product feel intuitive and trustworthy, utilizing brutalist typography and real-time data visualizations to convey system health and network capacity.',
    techStack: ['Solidity', 'Go', 'CUDA', 'React'],
    images: [
      'https://picsum.photos/seed/cloud-server/1920/1080?grayscale',
      'https://picsum.photos/seed/data-stream/1920/1080?grayscale'
    ]
  },
];
