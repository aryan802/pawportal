# Design Diagrams - Quick Reference Guide

## Overview

This document contains all the design diagrams needed for your project report section **4. Design Approach and Details**.

## File Structure

- **DESIGN_DIAGRAMS_FOR_REPORT.md** - Contains all diagrams in Mermaid format
- **PAWPORTAL_ARCHITECTURE.md** - Additional architecture diagrams (already exists)

## Diagrams Included

### 4.1 System Architecture
1. **High-Level System Architecture** - Shows complete system with all layers
2. **Three-Tier Architecture** - Simplified view of Presentation, Application, and Data tiers

### 4.2 Design Diagrams
1. **Data Flow Diagram (DFD)**
   - Level 0: Context Diagram
   - Level 1: Major Processes
   - Level 2: Detailed Process (Pet Adoption)

2. **Use Case Diagram**
   - All actors (Guest, Pet Owner, Shelter Admin, Moderator, System Admin)
   - All use cases organized by feature modules
   - Relationships between actors and use cases

3. **Class Diagram**
   - All major classes (User, Pet, Event, Forum, etc.)
   - Attributes and methods
   - Relationships and associations

4. **Sequence Diagrams**
   - User Registration and Login
   - Pet Adoption Process
   - Event Management and Real-time Chat
   - Lost & Found with RFID Matching
   - FAQ Chatbot Query

## How to Use in Your Report

### Step 1: Export Diagrams as Images

#### Option A: Using Mermaid Live Editor (Recommended)
1. Open https://mermaid.live/
2. Copy the Mermaid code from `DESIGN_DIAGRAMS_FOR_REPORT.md`
3. Paste into the editor
4. Click "Export" → Choose format (PNG/SVG)
5. Save the image
6. Insert into your report document

#### Option B: Using VS Code
1. Install "Markdown Preview Mermaid Support" extension
2. Open `DESIGN_DIAGRAMS_FOR_REPORT.md`
3. Right-click on preview → "Export as PNG/SVG"
4. Save and insert into your report

#### Option C: Using GitHub
1. Push the markdown file to GitHub
2. GitHub automatically renders Mermaid diagrams
3. Right-click on rendered diagram → "Save image as"
4. Insert into your report

### Step 2: Organize in Your Report

```
4. Design Approach and Details
├── 4.1 System Architecture
│   ├── 4.1.1 High-Level System Architecture
│   └── 4.1.2 Three-Tier Architecture
└── 4.2 Design Diagrams
    ├── 4.2.1 Data Flow Diagram (DFD)
    │   ├── Level 0: Context Diagram
    │   ├── Level 1: Major Processes
    │   └── Level 2: Pet Adoption Process
    ├── 4.2.2 Use Case Diagram
    ├── 4.2.3 Class Diagram
    └── 4.2.4 Sequence Diagrams
        ├── User Registration and Login
        ├── Pet Adoption Process
        ├── Event Management and Real-time Chat
        ├── Lost & Found with RFID Matching
        └── FAQ Chatbot Query
```

### Step 3: Add Descriptions

For each diagram in your report, include:

1. **Diagram Title**: Clear and descriptive
2. **Diagram**: The exported image
3. **Description**: 2-3 sentences explaining what the diagram shows
4. **Key Components**: List main components/elements
5. **Purpose**: Why this diagram is important

#### Example Description Format:

**4.1.1 High-Level System Architecture**

*Description:*
This diagram illustrates the complete system architecture of PawPortal, showing the interaction between different layers including the client layer (React frontend), application layer (Express.js backend), business logic layer, data access layer, and external services. The architecture follows a modular design pattern, ensuring separation of concerns and scalability.

*Key Components:*
- Client Layer: React Application with Router, Components, Context API
- Application Layer: Express.js Server with Routes, Controllers, Middleware
- Business Logic Layer: Authentication, Pet Management, Adoption, Events, Forum, Lost & Found, FAQ Services
- Data Layer: TiDB Database with multiple tables
- External Services: Cloudinary (Image Storage), JWT (Authentication), Socket.IO (Real-time)

*Purpose:*
This diagram helps understand the overall system structure, data flow, and component interactions, which is essential for system maintenance, scalability planning, and onboarding new developers.

## Diagram Details

### Data Flow Diagram (DFD)

**Purpose**: Shows how data flows through the system processes

**Key Elements**:
- **Processes**: Numbered circles/rectangles (1.0, 2.0, etc.)
- **Data Stores**: Open rectangles with "D" prefix (D1, D2, etc.)
- **External Entities**: Rectangles (User, Admin, etc.)
- **Data Flows**: Arrows with labels

**Levels**:
- **Level 0**: System boundary and external entities
- **Level 1**: Major system processes
- **Level 2**: Detailed process decomposition

### Use Case Diagram

**Purpose**: Shows system functionality from user perspective

**Key Elements**:
- **Actors**: Different user roles (Guest, Pet Owner, Admin, etc.)
- **Use Cases**: Ovals representing system functions
- **Relationships**: Lines connecting actors to use cases
- **System Boundary**: Rectangle containing all use cases

**Organization**: Use cases grouped by feature modules

### Class Diagram

**Purpose**: Shows system structure, classes, attributes, methods, and relationships

**Key Elements**:
- **Classes**: Rectangles with three compartments (Name, Attributes, Methods)
- **Relationships**: 
  - Association (solid line)
  - Aggregation (diamond)
  - Composition (filled diamond)
  - Inheritance (triangle)

**Notation**:
- `+` = Public
- `-` = Private
- `#` = Protected

### Sequence Diagram

**Purpose**: Shows interaction between objects over time

**Key Elements**:
- **Lifelines**: Vertical lines representing objects/actors
- **Activation Bars**: Thin rectangles on lifelines
- **Messages**: Arrows between lifelines
- **Notes**: Annotations explaining steps

**Message Types**:
- Synchronous (solid arrow)
- Asynchronous (open arrow)
- Return (dashed arrow)

## Tips for Report Writing

1. **Be Consistent**: Use the same diagram style throughout
2. **Add Captions**: Every diagram should have a caption and figure number
3. **Reference Diagrams**: Reference diagrams in text (e.g., "As shown in Figure 4.1...")
4. **Explain Relationships**: Don't just show diagrams, explain what they represent
5. **Use High Quality**: Export diagrams in high resolution (300 DPI for print)
6. **Color Coding**: Use consistent colors (already applied in diagrams)
7. **Keep It Simple**: Don't overcrowd diagrams with too much detail

## Color Scheme Used

- **Frontend/Client**: Light Blue (#61dafb)
- **Backend/Server**: Green (#339933)
- **Database**: Blue (#4479a1)
- **External Services**: Dark Blue (#3448c5)
- **Authentication**: Orange (#ff9800)
- **Real-time**: Black (#010101)
- **Actors**: Various pastel colors

## Troubleshooting

### Diagrams not rendering?
- Check Mermaid syntax (ensure proper indentation)
- Use Mermaid Live Editor to validate
- Check for special characters that might break syntax

### Need to modify diagrams?
- Edit the Mermaid code directly
- Use Mermaid Live Editor for visual editing
- Re-export as image after changes

### Need different diagram types?
- Check Mermaid documentation: https://mermaid.js.org/
- Common types: flowchart, sequenceDiagram, classDiagram, erDiagram, gantt, pie

## Additional Resources

- **Mermaid Documentation**: https://mermaid.js.org/
- **Mermaid Live Editor**: https://mermaid.live/
- **Diagram Best Practices**: https://mermaid.js.org/intro/getting-started.html

## Next Steps

1. Review all diagrams in `DESIGN_DIAGRAMS_FOR_REPORT.md`
2. Export each diagram as high-resolution image
3. Organize diagrams in your report document
4. Write descriptions for each diagram
5. Add references and citations
6. Review and proofread

---

**Note**: All diagrams are in Mermaid format, which is widely supported and can be easily modified or exported to various formats.

