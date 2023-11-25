import os
import shutil

main_path="C:/Users/gooks/OneDrive/문서/GitHub/meme-maker/fonts"
list_1=os.listdir(main_path)
list_fonts=[]

# copy_path="C:/Users/gooks/OneDrive/문서/GitHub/meme-maker/fonts"
# for i in list_1:
#     file_name=os.listdir(f"{main_path}/{i}")[0]    
#     origin_path=f"{main_path}/{i}/{file_name}"
#     shutil.copy(origin_path,main_path)
print(os.listdir(main_path))

# main_path_1="C:/Users/gooks/OneDrive/문서/GitHub/meme-maker/fonts"
# list_2=os.listdir(main_path_1)
# for i in list_2:
#     new_file_name=i.replace("나눔손글씨 ","")
#     os.rename(f"{main_path_1}/{i}",f"{main_path_1}/{new_file_name}")
# print(os.listdir(main_path_1))