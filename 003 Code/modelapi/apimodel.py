from flask import Flask, jsonify, request
from PIL import Image
import torch 
import torchvision.transforms as imtransforms 
from torchvision import datasets,models, transforms
import torch.nn as nn
import os 
import io
from pandas import DataFrame
from konlpy.tag import Mecab
from tqdm import tqdm
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
app = Flask(__name__)
currentPath=os.getcwd()

model = models.resnet34()

num_features =model.fc.in_features

model.fc = nn.Linear(num_features, 7)
model = model.to(device)
model.load_state_dict(torch.load(currentPath+'/model.pt'), strict=False)

model.eval()

transforms_test = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

class_id = ['Spider', 'centipede', 'mouse', 'nomal', 'scorpion', 'snake', 'worm']
def get_classfication(image_bytes):
    img = Image.open(io.BytesIO(image_bytes))
    img = transforms_test(img).unsqueeze(0).to(device)
    with torch.no_grad():
        outputs = model(img)
        _, preds = torch.max(outputs, 1)

    return class_id[preds[0]]


@app.route("/classfication", methods=['POST'])
def averclassfication():
    file= request.files['image']
    image_bytes = file.read()
    class_id =get_classfication(image_bytes=image_bytes)
    print(class_id)
    return jsonify({'class_id':class_id})



if __name__ == '__main__':
    app.run()