# **Link**

<br>

<p align="center">
  <img width=50% src="https://i.imgur.com/29CfSrR.png" />
</p>

<br>

Link는 플레이어가 착시효과를 이용하여 목적지까지 길을 연결하며 진행하는 웹용 퍼즐 게임입니다.

> [Link 발표 / 시연 영상](https://youtu.be/8BbCyy9eL1w?t=1936)

> [Client Repository](https://github.com/145pip/link)

<br>

# Table of Contents

- [Preview](#preview)
- [Motivation](#motivation)
- [기능 및 기여도](#기능-및-기여도)
- [Challenges](#challenges)
  - [1. 패러독스 도형 구현하기](#)
    - [착시효과를 어떻게 구현할 수 있을까?](#link-착시효과-자동감지-알고리즘)
    - [react에 3D 오브젝트의 텍스쳐, 명암, 애니메이션 정보 전달하기](#link-착시효과-자동감지-알고리즘)
  - [2. 착시효과의 수치화](#1-착시효과를-어떻게-수치화-할-수-있을까)
    - [Link: 착시효과를 일으키는 카메라 앵글 계산하기](#link-착시효과-자동감지-알고리즘)
    - [Auto Snap: 착시 앵글 자동완성 알고리즘](#auto-snap-착시효과-자동완성-알고리즘)
  - [3. 자동으로 패스 연결하기](#)
    - [graph 자료구조를 이용하여 패스 정보 생성하기](#)
    - [바라보는 방향에 따라 선택적으로 그래프 패스 연결하기](#)
- [Tech stack](#tech-stack)
- [Timeline](#timeline)
- [Members](#members)

<br>

# Preview

<p align="center">
  <img src="https://github.com/145pip/link/assets/105766632/a77c489a-cbf9-4ab2-b621-e070aef83b32" align="center" width="49%">&nbsp;
  <img src="https://github.com/145pip/link/assets/105766632/8b47e856-4154-42ae-84c5-a97bc8e0b1cb" align="center" width="49%">;
</p>

<br>

# Motivation

<p align="center">
  <img src="https://i.imgur.com/e7qXU5E.jpg" />
</p>

영화 인셉션의 펜로즈 계단에서 영감을 받아, 3차원 착시효과인 패러독스를 이용한다면 현실에서 불가능한 것들을 웹 공간에서는 가능하게 할 수 있지 않을까 생각하게 되었습니다.

불가능한 패러독스를 이용하여 재미있는 구조물을 만들어보자는 고민 끝에 착시효과를 이용해 길을 찾아가는 게임, Link를 기획하게 되었습니다.

<br>

# 기능 및 기여도

| -                                      | 전권호 | 이서진 | 정윤채 |
| -------------------------------------- | -----: | -----: | -----: |
| ES Lint / Husky 설정                   |      - |   100% |      - |
| 3D 착시앵글 자동감지 알고리즘 생성     |   100% |      - |      - |
| Auto Snap 알고리즘 생성                |   100% |      - |      - |
| 공통 메뉴 버튼 및 모달 구현            |      - |      - |   100% |
| 시작화면 기획 / 구현                   |      - |      - |   100% |
| 스테이지 선택화면 기획 / 구현          |    80% |    20% |      - |
| Graph Path 알고리즘 생성               |      - |   100% |      - |
| 플레이어 오브젝트 KeyControl 로직 구현 |      - |   100% |      - |
| 튜토리얼 스테이지 기획 / 구현          |   100% |      - |      - |
| 스테이지1 기획 / 구현                  |   100% |      - |      - |
| 스테이지2 기획 / 구현                  |   100% |      - |      - |
| 스테이지3 기획 / 구현                  |   100% |      - |      - |
| 맵 공통사용 오브젝트 및 이펙트 구현    |   100% |      - |      - |
| 플레이어 오브젝트 및 워킹 모션 구현    |   100% |      - |      - |
| 효과음 선정 및 사운드 컨트롤 기능 구현 |      - |      - |   100% |

<br>

# Challenges

## 1. 3D 패러독스 오브젝트의 구현

### 착시효과를 어떻게 구현할 수 있을까?

특정 시야각에서 착시효과를 일으키는 3차원 물체, 즉 3D 패러독스 오브젝트를 웹에서 구현하고 사용자와 인터랙션 할 수 있는 환경을 만들기 위해서는, 전통적인 방법으로 3D 오브젝트를 웹페이지에 로드하는 것 이상의 방법이 필요했습니다.

가장 널리 알려진 3D 패러독스 오브젝트 중 하나인 `Penrose Triangle`의 경우, 3개의 직육면체가 직각으로 이어진 형태를 띄는데, 특정 각도로 바라볼 때 면이 무한히 이어지는 삼각형처럼 보이는 특징이 있습니다.

이를 `three.js` 라이브러리를 이용하며 웹페이지에 렌더링 하는 경우, 착시가 일어나야 하는 각도로 뷰포트를 설정하더라도 단절된 면이 이어지지 않아 착시가 일어나지 않는다는 점이 본 프로젝트의 첫번째 challenge 였습니다.

<p align="center">
    <img src="https://github.com/145pip/link/assets/105766632/7b3ecb12-64cf-458d-ae0d-719b0af6763c">
</p>

<br>

이를 해결하기 위해 `three.js` 내에서 3D 패러독스 오브젝트를 투명하게 만들거나, 특수한 재질과 명암을 부여하는 방법등을 시도해 보았습니다. 하지만 스테이지이가 더 복잡한 구조로 설뎨될 수록 여러개의 착시효과가 동시에 요구되는 상황이 발생하며 해당 방법 만으로는 한계가 명확하다는 것을 알 수 있었습니다.

<p align="center">
    <img src="https://github.com/145pip/link/assets/105766632/7b3ecb12-64cf-458d-ae0d-719b0af6763c" width="48%">&nbsp;
    <img src="https://github.com/145pip/link/assets/105766632/da3b7fc3-38b2-455e-ac3d-e06acd70ffae" width="48%">
</p>

<br>

이러한 한계를 극복하기 위해 3D 패러독스 오브젝트를 `하나의 덩어리 모델`로 구성하는 것이 아닌, `착시가 가능한 cube를 쌓고 연결하여 생성한 구조물`로 재구성 하였습니다. 또한 각 `Cube`가 어느 각도에서도 착시효과를 일으킬 수 있도록, 3D 소프트웨어 `blender`를 사용하여 각 모서리에 `bevel`(edge를 갈아 둥글게 만드는 것)을 적용하고 재질, 질감, 명암에 특수한 값을 부여하여 특수한 `Cube`블럭을 생성함으로서 해당 문제를 해결할 수 있었습니다.

이렇게 생성된 `Cube`를 `React`에서 불러오고 `Canvas`에 렌더링하기 위한 방법으로 `@react-three/drei` 라이브러리에서 제공하는 `useGLTF` 훅을 사용하였습니다.

기본적으로 `useGLTF` 훅은 `gltf`와 `glb` 확장자를 지원하는데, 각 확장자 타입별 특성은 아래와 같습니다:

<br>

| -    | gltf                                                                         | glb                                                                                           |
| ---- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 명칭 | Graphics Library Transmission Format                                         | Graphics Library Transmission Format Binary                                                   |
| 특징 | 3D 모델의 구조, 위치, 재질, 텍스처 등에 대한 정보가 포함된 메타데이터를 저장 | 모든 데이터를 하나의 파일에 포함함으로서 파일 크기를 최소화하고, 로딩 시간을 줄이기 위해 설계 |
| 기반 | JSON 형식                                                                    | 바이너리 형식                                                                                 |
| 장점 | 편집이 용이 <br> 부분적 로드 가능                                            | 파일관리가 단순 <br> 모든 데이터가 하나의 파일에 있어 로딩 시간이 빠름                        |
| 단점 | 여러 파일의 관리가 필요 <br> 전체 모델 로드에 많은 시간이 소요될 수 있음     | 편집이 어려움                                                                                 |

<br>

본 프로젝트에서 사용된 3D 모델은 모두 단일 파일로 구성 되었으며, 외부 3D 소프트웨어를 사용하여 편집되었기 때문에 `react` 내에서 3D 모델을 편집할 필요가 없었습니다. 더 나아가 유저와의 실시간 상호작용이 중요하였기 때문에 로딩속도에 민감하다는 특성이 있었습니다.

이에 `glb` 파일형식이 더 적합하다고 판단하여 최종적으로 모든 3D 오브젝트 파일에 적용하게 되었으며, 이를 통해 3D 오브젝트의 모델링, 재질, 라이팅 및 애니메이션 정보를 `react`로 전달할 수 있었습니다.

<br>

## 2. 착시효과의 수치화

### Link: 착시효과를 일으키는 카메라 앵글 계산하기

Link는 플레이어들로 하여금 착시효과를 이용하여 패스를 이어 붙이며 게임을 진행할 수 있도록 기획 되었습니다. 그리고 이를 실현시키기 위해서는 먼저 착시효과를 수치화할 수 있어야 했습니다.

착시는 `실제로는 분리되어 있는 특정 면들이 나란히 이어지는 것처럼 보이는 현상`을 의미하는데, 이 현상이 일어날 때 각 면의 특정 모서리 (이하 `edge`)들은 3차원 공간에서 완전히 포개지는 것처럼 보이게 된다는 것을 발견하였습니다. 그리고 이러한 이벤트를 패스가 연결되었다는 의미에서 `link` 이벤트라 통칭하였습니다.

<p align="center">
    <img src="https://github.com/145pip/link/assets/105766632/e345a870-b076-42e3-8e1d-c71b5501ab37" >
</p>

<br>

`link`가 활성화 될 때마다, 뷰포트의 카메라와 `edge`들을 연결한 벡터는 같은 방향을 바라보았는데, 이를 이용하면 착시효과를 수치화 할 수 있을것이라고 생각하였습니다.

<p align="center">
    <img src="https://github.com/145pip/link/assets/105766632/e596af34-8f10-43e5-a358-623f64b09f28" >
</p>

<br>

먼저 `react-three/fiber` 라이브러리의 `useThree` 훅을 사용하여 `camera 객체`를 생성하였으며, 해당 객체의 특성 중 `rotation`이 카메라가 바라보는 방향과 관련이 있다는 것을 알게 되었습니다.

`rotation` 특성에는 `Euler angle` (ψ, θ, φ) 값이 저장되어 있었는데, 이는 카메라가 바라보는 방향과 align된 벡터가 각각 x, y, z축에 대해 가지는 회전값을 radian 형식으로 3차원 배열에 정리한 값을 의미하였습니다.

그리고 `edge`를 연결하여 얻은 벡터를 `camera 객체`처럼 `Euler angle`로 표현할 수 있다면, `edge`의 좌표 정보만으로도 착시효과를 일으키는 시야각을 계산해낼 수 있다는 결론을 도출하였습니다.

`Euler angle`을 구하는 공식은 Gregory G. Slabaugh 교수의 [Computing Euler angles from a rotation matrix](http://eecs.qmul.ac.uk/~gslabaugh/publications/euler.pdf) 등 3D rotational matrix와 관련된 학술자료를 통해 알아낼 수 있었습니다.

해당자료에 따른 `Euler angle` 계산식은 아래와 같이 정리됩니다:

- [x축 회전, ψ 계산식]
  - ψ = atan2(R32, R33)
- [y축 회전, θ 계산식]
  - θ = arcsin(-r31)
  - cosθ = sqrt(1 - sin²θ) = sqrt(1 - r31²)
  - θ = atan2(sqrt(r32² + r33²), -r31)
- [z축 회전, φ 계산식]
  - 0 (게임화면에서 z축 회전을 고려하지 않음)

<br>

여기서 atan2는 atan과 같지만, 네 사분면에서 점의 위치에 따른 각도를 보다 정확하게 계산할 수 있는 함수를 의미합니다.

이렇게 정리되어진 공식에 본 프로젝트에서 사용되어진 좌표시스템의 특수성을 고려하여 공식에 `calibration`을 추가로 적용하였스며, [`edge`의 좌표정보로 `link` 각도를 계산하는 로직](https://github.com/145pip/link/blob/develop/src/utils/LinkAngleCalculator.js#L22)을 최종적으로 완성할 수 있었습니다.

<br>

### Auto Snap: 착시 앵글 자동완성 알고리즘

플레이어가 게임을 진행하기 위해선, 게임 화면을 마우스로 돌려 `link` 각도를 찾아내고 이에 따라 길이 연결되면 플레이어 오브젝트를 이동시켜야 했습니다. 이때 `link` 앵글을 `정확히` 찾아내어 일치시키는 것은 매우 어려워 사용자 경험을 크게 해칠 수 있다고 판단되었습니다.

이에 따라 `link` 앵글에 유효 범위를 설정하여, 특정 `tolerance` 범위 내에 카메라 앵글이 접근하는 경우, 카메라 앵글을 `link` 앵글로 [자동 완성하는 기능](https://github.com/145pip/link/blob/develop/src/utils/AutoSnap.js)을 구현하였습니다.

<p align="center">
    <img src="https://github.com/145pip/link/assets/105766632/e596af34-8f10-43e5-a358-623f64b09f28" >
</p>

<br>

## 3. 자동으로 패스 연결하기

### 자료구조의 선택

유저가 키보드를 통해 조작하는 플레이어 오브젝트는, `path`라 불리는 맵 구성 블록의 연결된 윗면을 밟으며 이동하게 됩니다. 이 path들은 `link` 여부에 따라 서로 연결되고 분리되어져야 하기 때문에, 이 `path`를 적합한 자료구조에 저장하는 것이 매우 중요했습니다.

`path`가 병합되며 순환하는 구조가 발생하는 경우를 대비하여, 가장 처음에는 양방향 연결리스트를 고려하였습니다.

하지만 인접 블럭이 3개 이상일 때의 상황을 고려하여, 최종적으로 `Graph`로 결정하게 되었습니다.

좌표끼리 연결, 해제, 검색 등을 빠르게 하기 위해서 Graph nodes는 `map`으로 구현하였습니다. 그리고 `key`값에는 position 배열을 `JSON.stringify`한 값을, `value`에는 `edge` 정보를 담았습니다.

또한 `addNode`, `addEdge`, `removeEdge`, `removeNode`와 같은 메소드를 구현하여 `node`와 `edge`등을 추가하고 삭제하였습니다.

<br>

### 패스 생성하고 연결하기

path를 생성하기 위해 가장 처음 접근햇던 방식은 플레이어 오브젝트가 현재 밟고 있는 블록과 높이(z값)가 같은 블록들은 모두 패스로 인식되게 하는 방법이었습니다.

하지만 동등한 z값을 가지면서도 인접하지 않은 패스들 또한 함께 연결된다는 문제가 발생하였으며, 이를 해결하기 위해 BFS 탐색방식을 적용하여 플레이어 오브젝트의 현 위치를 중심으로 탐색해 나감으로서 인접한 패스만을 감지할 수 있도록 하였습니다.

또한 사용자가 link를 트리거할 때 path를 연결하기 위해 아래의 함수 흐름이 이어지도록 구현하였습니다:

`getPathPositions`

- 플레이어 현재 좌표와, 전체 스테이지 좌표를 인자로 받는 함수입니다.
- 플레이어 좌표와 높이(y)가 동일하면서 이동 가능한(위로 쌓인 블럭이 없는) 좌표만 반환하도록 구현했습니다.

`isNextPosition`

- 두 개의 좌표를 인자로 받아 이어진 좌표인지 확인하는 함수입니다.
- x, z값 중 하나만 1 차이인지 확인하여 `Boolean`으로 반환합니다.

`createPath`

- 플레이어 좌표, 전체 좌표를 받아서 위의 `Graph`, `getPathPositions`, `isNextPosition` 함수들을 이용해 최종 패스를 만드는 함수입니다.
- `getPathPositions`를 이용해 받은 좌표로 `Graph`를 생성하고,
  반복문을 돌며 `isNextPosition`으로 인접한 좌표일 경우 `graph.addEdge` 메소드를 이용해 연결합니다.

<p align="center">
  <img src="https://github.com/145pip/link/assets/105766632/e596af34-8f10-43e5-a358-623f64b09f28">
</p>

<br>

# Tech Stack

### Frontend

- JavaScript
- React
- Redux/toolkit
- Three.js
- react-three/drei
- react-three/fiber
- Styled Components
- ESLint

<br>

# Timeline

### 기획기간 (5일) - 2023.03.06 ~ 2023.03.10

- 프로젝트 기획 및 아이디어 선정
- PoC (Proof of Concept) 진행
- 목업 디자인 생성
- 칸반 생성
- GIT 플로우 전략 수립

<br>

### 개발기간 (18일) - 2023.03.13 ~ 2023.03.30

- 기능 구현

<br>

# Members

- 전권호: [Github](https://github.com/j25nkh)
- 이서진: [Github](https://github.com/xollee)
- 정윤채: [Github](https://github.com/yourchaee)
