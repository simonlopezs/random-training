Commit all changes and push to the remote repository.

Steps:
1. Run `git status` to see changed files
2. Run `git diff` to understand the changes
3. Run `git log --oneline -5` to see recent commit style
4. Stage all relevant files (do NOT use `git add -A`, add specific files)
5. Write a commit message using Conventional Commits format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for refactoring
   - `style:` for UI/styling changes
   - `chore:` for maintenance tasks
   - `docs:` for documentation
   - Use a short subject line (max 72 chars)
   - Add a body with bullet points if there are multiple changes
   - End with: Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
6. Push to the remote
