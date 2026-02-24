# Autonomous Educational Game Development Pipeline

## Pain Point
**The Origin Story:** A "LANero of the old school" dad wanted to create a safe, ad-free, and high-quality gaming portal for his daughters, Susana (3) and Julieta (coming soon). Existing sites were plagued with spam, aggressive ads, and deceptive buttons (dark patterns) that frustrated his toddler.

**The Challenge:** Building a "clean, fast, and simple" portal was the easy part. The real challenge was populating it with **40+ educational games** tailored to specific developmental stages (0-15 years) without a team of developers. Manual development was too slow for a solo parent-developer, and maintaining consistency across dozens of games was becoming a nightmare.

## What It Does
This use case defines a "Game Developer Agent" that autonomously manages the entire lifecycle of a game's creation and maintenance. The workflow enforces a **"Bugs First"** policy where the agent must check for and resolve reported bugs before implementing new features.

**Efficiency:** This pipeline is capable of producing **1 new game or bugfix every 7 minutes**. The agent tirelessly iterates through the backlog of 41+ planned games, alternating between creating new content and correcting issues detected in previous cycles.

When the path is clear, the agent:
1.  **Selects**: Identifies the next game from a queue (`development-queue.md`) based on a "Round Robin" strategy to balance content across age groups.
2.  **Implements**: Writes HTML5/CSS3/JS code for the game, following strict `game-design-rules.md` (no frameworks, mobile-first, offline-capable).
3.  **Registers**: Automatically adds the game metadata to the central registry (`games-list.json`).
4.  **Documents**: Updates the `CHANGELOG.md` and `master-game-plan.md` status.
5.  **Deploys**: Handles the Git workflow: fetching master, creating a feature branch, committing changes with conventional commits, and merging back.

## Prompts

The core of this workflow is the **System Instructions** given to the agent. This prompt turns the LLM into a disciplined developer that respects the project's rigid structure.

*(**Note:** The actual prompts used in production are in **Spanish** (`es-419`) to align with the project's target audience (Latin American children) and potential future contributors from the region. The version below is translated for this documentation.)*

```text
Act as an Expert in Web Game Development and Child UX.
Your goal is to develop the next game in the production queue.

Please read and analyze the following context files before starting:

1.  BUG CONTEXT (Top Priority - CRITICAL):
    @[bugs/]
    (Check this folder. If there are files, YOUR TASK IS TO FIX **ONLY THE FIRST FILE** (in alphabetical order). Ignore the rest of the bugs and the game queue for now).

2.  QUEUE CONTEXT (Which game is next):
    @[development-queue.md]
    (Identify the game marked as [NEXT] in the "Next Games" section. ONLY if there are no bugs).

3.  DESIGN RULES (Technical Standards):
    @[game-design-rules.md]
    (Strictly follow these rules: Pure HTML/CSS/JS, folder structure, mobile responsiveness)

4.  GAME SPECIFICATIONS (Mechanics and Assets):
    (Identify the corresponding file in games-backlog/ based on the game ID)

5.  CENTRAL REGISTRY (Integration):
    @[public/js/games-list.json]
    (File where you MUST register the new game so it appears on the home page)

TASK:
0. **BUGS FIRST!**: If the `bugs/` folder has content, your only priority is to fix **the first bug in alphabetical order**. Create a `fix/...` branch, resolve **that** bug, update status, and merge. **Do not attempt to fix multiple bugs at once.**
   - IF THERE ARE NO BUGS, proceed with the next game:

1. **Synchronization**: `git fetch && git pull origin master` (CRITICAL).
2. Create a new branch: `git checkout -b feature/[game-id]`.
3. Create the folder and files in 'public/games/[game-id]/'.
4. Implement logic and design according to the backlog and design rules.
5. Register the game in 'games-list.json' (CRITICAL).
6. When finished:
    - Update `CHANGELOG.md` bumping the version.
    - Update `master-game-plan.md` and `development-queue.md`.
    - Document changes: `git commit -m "feat: add [game-id]"`.
7. **Delivery**:
    - Push: `git push origin feature/[game-id]`.
    - Request merge to master.
    - Once in master, push changes (`git push origin master`).
```

## Skills Needed
-   **Git**: To manage branches, commits, and merges.
  
## Related Links
-   [Project Origin Story (LinkedIn)](https://www.linkedin.com/feed/update/urn:li:activity:7429739200301772800/) - How this project emerged after configuring OpenClaw.
-   [El Bebe Games Repository](https://github.com/duberblockito/elbebe/tree/master) - Source code.
-   [El Bebe Games Live Site](https://elbebe.co/) - The result of this pipeline.
-   [HTML5 Game Development Best Practices](https://developer.mozilla.org/en-US/docs/Games)
