"""Main module to auto load images"""
import os
import re

IMGPATH: str = "images"
TEXT: str = "<!-- IMAGES -->"
TEMPLATE: str = '\n{TABSPACE}<div id="{ID}" class="image" style="background-image: url(&quot;{IMGURL}&quot;);"></div>'
images = os.listdir(IMGPATH)

def main():
    """The main function loading the images"""
    with open("old.html", "r", encoding="utf-8") as f:
        data: str = f.read()

    start: int = re.search(r"\W*<!-- IMAGES -->", data).start()+2
    end: int = data.index(TEXT)
    tabspace: int = end - start - 1  # \n ..... TEXT
    end += len(TEXT)

    new_data = data[:start]
    for i, image in enumerate(images):
        new_data += TEMPLATE.replace("{TABSPACE}", " "*tabspace).replace("{ID}", f"{i+1}") \
                            .replace("{IMGURL}", f"{IMGPATH}/{image}")

    new_data += data[end:]

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(new_data)

if __name__ == "__main__":
    main()
