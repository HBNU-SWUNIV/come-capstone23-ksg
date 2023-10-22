#imagedetect.py
#만약 파이썬을 사용하고 싶지 않다면 pytorch를 tensorflow.js로 변환해야 함
# 설치해야 할 것 : pip install Flask torch torchvision Pillow flask_cors
# 실행 : cd backend/data > python imagedetect.py

from flask import Flask, request, jsonify
import torch
import torchvision
import torchvision.transforms as transforms
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 여기에 사용할 모델 입력
model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

# 임시로 COCO 데이터셋 사용, 다른 데이터셋을 사용한다면 변경
COCO_CLASSES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 
    'bus', 'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 
    'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 
    'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 
    'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 
    'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 
    'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 
    'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange', 
    'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 
    'couch', 'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 
    'mouse', 'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 
    'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear', 
    'hair drier', 'toothbrush'
]

# 조건(임시) : 사람, 자동차, 오토바이
TARGET_CLASSES = ['person', 'car', 'motorcycle']

@app.route('/detect', methods=['POST'])
def detect():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    image = Image.open(io.BytesIO(file.read()))

    transform = transforms.Compose([
        transforms.ToTensor()
    ])

    image_tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        prediction = model(image_tensor)

    # 결과 필터링
    output = []
    for i in range(len(prediction[0]['boxes'])):
        label_index = prediction[0]['labels'][i].item()
        label_name = COCO_CLASSES[label_index]
        if label_name in TARGET_CLASSES:
            output.append({
                "boxes": prediction[0]['boxes'][i].tolist(),
                "labels": label_name,
                "scores": prediction[0]['scores'][i].item()
            })

    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)
