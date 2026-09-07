1. Config username and email by using the command:
-   git config user.name "Your New Name"
-   git config user.email "your.email@example.com"

2. Create a new html file by using touch command (gitbash)
-   touch index.html

3. Create a basic html code of your choice

4. Add the files created to staging by using the command:
- git add .
- Or
- git add <file name>

5. Commit your file changes by using the command:
- git commit -m "Your message"

6. You should now have a master/main branch

7. To create a new branch, use the command:
- git switch -b <new-branch-name>/ git checkout -b <new-branch-name>

8. To view existing branches, use the command:
- git branch

9. To switch to existing branches, use the command:
- git switch <file-name>/ git checkout <file-name>

10. On main/master branch, improve the webpage by adding design and interactivity (css, javascript)

11. add, and commit the new files to the main/master branch

12. to push a commit towards the remote github repo, use the command:
-  git remote add origin <your github url>
-  git push -u origin <other-branch-name>