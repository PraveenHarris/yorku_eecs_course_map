# YorkU EECS Course Map
This project allows you to **visualize the courses that you can take for the coming semester**! Using your prerequisites, you can see the courses that you can enroll into inside a clean UI. The code also works for other all other departments at York, so be sure to change the link in Jupyter Notebook to your department's course directory. 
***
### Implementation
This project was built using **Python** and a few web technologies **(HTML/CSS/JS)**. 
 
#### Collecting data
A Jupyter Notebook was used to scrape, parse and wrangle the data before storing it in **JSON** format. **BeautifulSoup** was used to scrape data off the YorkU EECS course directory, along with a few **Regular Expressions** that made it effortless to parse and wrangle the data. 

#### Visualize Folder
The 'Visualize' folder consists of all the files that are needed to display the information. The data is displayed in a tree diagram extending from left to right. The nodes of the tree represent courses that are available. By cliking a node in the tree you are exposed to 2 types of branches:
1. Courses that you are not elligible to enroll in (as they were prerequisites to courses that you clicked on)
2. **Courses that you can take**

By clicking courses which you already have the credits to, you can see the courses that are available for you to enroll in, inside a clean UI!

***
***This project is still under developement***
