# 한밭대학교 컴퓨터공학과 KSG팀

**팀 구성**
- 20171584 석수용
- 20171605 강장운
- 20207126 김정훈

## <u>Teamate</u> Project Background
- ### 필요성
  - 온라인 커뮤니티의 사용자는 게시물의 내용을 직접 조회하기 전에는 알 수 없기에 원치 않는 주제의 게시글에 시간을 낭비하게 될 수도 있다.
  - 또한 이러한 특성을 악용한 타 사용자가 혐오감이나 공포를 조장할 수 있는 이미지를 업로드하여, 이에 의도치 않게 노출된 다른 사용자가 피해를 입을 수도 있다.
- ### 기존 해결책의 문제점
  - 게시글의 주제를 분류하는 기능은 대부분의 웹 사이트에 존재하나, 이는 작성자가 수동으로 지정해야 하므로 실수 또는 고의로 주제를 지정하지 않는다면 향후에 찾기가 어려워진다.
  - 혐오감을 조장하는 이미지의 제거 또한 게시판 관리자, 운영자 등의 권한을 가진 사용자에 의해 삭제 또는 차단이 이루어진다.
  - 따라서 해당 사안들의 기존 해결책은 모두 인력에 의존하고 있다는 한계를 가지고 있다.
  
## System Design
<img alt="Vue.js" src ="https://img.shields.io/badge/Vue.js-4FC08D.svg?&style=for-the-badge&logo=Vue.js&logoColor=white"/> <img alt="Node.js" src ="https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white"/> <img alt="Python" src ="https://img.shields.io/badge/Python-3776AB.svg?&style=for-the-badge&logo=Python&logoColor=white"/> <img alt="MariaDB" src ="https://img.shields.io/badge/MariaDB-003545.svg?&style=for-the-badge&logo=MariaDB&logoColor=white"/>
![ksg_구성도](https://github.com/HBNU-SWUNIV/come-capstone23-ksg/assets/127067579/cf56ec19-e80e-4c55-8f0f-3ed7220bef59)
  - ### System Requirements
    - 혐오 이미지(뱀, 거미, 지네 등)가 업로드됐을 때 이를 판별하여 분류하고, 다른 사용자가 혐오 이미지가 포함된 게시물을 조회했다면 차단용 대체 이미지를 출력해야 한다.
    - 게시글을 업로드했을 때 게시글의 내용을 판별하여 내용에 어울리는 주제로 분류해야 한다.
    - 해당 시스템들이 원활하게 동작 가능한 웹 사이트를 구축해야 한다.
    
## Case Study
  - ### Description
  
  
## Conclusion
  - ### 웹 사이트의 게시판 화면
    ![게시판화면](https://github.com/HBNU-SWUNIV/come-capstone23-ksg/assets/127067579/09b48097-5976-4709-88be-355f8c0fecdd)
  - ### 게시글에 포함된 혐오 이미지를 차단한 화면
    ![게시판혐오이미지](https://github.com/HBNU-SWUNIV/come-capstone23-ksg/assets/127067579/92ed9d1f-7158-4bc5-9ee2-5ffddb9d063a)
  - ### 기대 효과
    - 주제 자동 분류 시스템을 통해 사용자가 원하거나 관심 있는 주제의 게시글을 탐색하는 속도 및 정확성을 증가시킬 수 있다.
    - 혐오 이미지 차단 시스템을 통해 사용자가 실수로라도 혐오 이미지에 노출되는 사태를 미연에 방지할 수 있다.
    - 이상의 시스템들을 타 웹 사이트에도 적용할 수 있다면 웹 사이트 관리의 효율성 증대를 기대할 수 있다.
  
## Project Outcome
- ### 20XX 년 OO학술대회 
