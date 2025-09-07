const messages = [
  {
    id: 1,
    from_user: { id: 1, name: "John Doe" }, // 프론트엔드
    createdAt: new Date("2025-01-01 09:00:00"),
    message: "어제 서버 배포는 잘 됐어?",
  },
  {
    id: 2,
    from_user: { id: 2, name: "Smith" }, // 백엔드
    createdAt: new Date("2025-01-01 09:01:20"),
    message: "응, 오류 없이 잘 됐어. 프론트도 빌드 괜찮았어?",
  },
  {
    id: 3,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-01 09:02:10"),
    message: "응, 다행히 문제 없더라. 근데 API 응답 속도가 좀 느린 것 같아.",
  },
  {
    id: 4,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-01 09:03:00"),
    message: "어제 캐싱 설정 아직 못 넣었거든. 오늘 Redis 붙여볼게.",
  },
  {
    id: 5,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-01 09:05:40"),
    message: "좋아. 그럼 나는 프론트에서 로딩 스피너 추가해둘게.",
  },
  {
    id: 6,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-01 10:10:00"),
    message: "아 맞다, 로그인 API 응답에 닉네임 추가해줄까?",
  },
  {
    id: 7,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-01 10:11:15"),
    message: "좋지! 그러면 사용자 프로필 화면에서 바로 쓸 수 있겠다.",
  },
  {
    id: 8,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-01 11:00:00"),
    message: "추가했어. 방금 푸시했으니까 확인해봐.",
  },
  {
    id: 9,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-01 11:01:30"),
    message: "응, 잘 들어왔네. 고마워!",
  },
  {
    id: 10,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-01 12:00:00"),
    message: "점심 뭐 먹을래?",
  },
  {
    id: 11,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-01 12:00:20"),
    message: "오늘은 국밥 어때?",
  },
  {
    id: 12,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-01 12:01:00"),
    message: "좋다. 가자~",
  },
  // ---- 오후 업무 ----
  {
    id: 13,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-01 14:20:00"),
    message: "API 문서 최신화 좀 부탁할 수 있을까?",
  },
  {
    id: 14,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-01 14:21:15"),
    message: "알겠어. 스웨거에 바로 업데이트 해둘게.",
  },
  {
    id: 15,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-01 16:00:00"),
    message: "오늘 배포 전에 QA 체크리스트 한번 같이 보자.",
  },
  {
    id: 16,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-01 16:01:40"),
    message: "응. 5시에 같이 확인하자.",
  },
  {
    id: 17,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-01 18:10:00"),
    message: "오늘 고생했다. 내일은 알림 기능 붙이는 거야?",
  },
  {
    id: 18,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-01 18:11:30"),
    message: "맞아. 내일 오전에 DB 스키마 먼저 수정할게.",
  },
  // ---- 다음날 (2025-01-02) ----
  {
    id: 19,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-02 09:00:00"),
    message: "어제 얘기한 알림 UI 내가 미리 작업 좀 해놨어.",
  },
  {
    id: 20,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-02 09:02:10"),
    message: "오 빠르네! 난 DB에 알림 테이블 추가했어.",
  },
  {
    id: 21,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-02 09:05:00"),
    message: "혹시 알림 읽음 처리 플래그도 넣어뒀어?",
  },
  {
    id: 22,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-02 09:06:20"),
    message: "응, `is_read` 컬럼 넣어놨지.",
  },
  {
    id: 23,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-02 10:00:00"),
    message: "굿! 프론트에서는 읽으면 회색으로 바뀌게 할게.",
  },
  {
    id: 24,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-02 10:01:10"),
    message: "좋아. 근데 푸시 알림은 이번 스프린트에 안 들어가지?",
  },
  {
    id: 25,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-02 10:02:50"),
    message: "응, 그건 다음 스프린트에 할 거야.",
  },
  {
    id: 26,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-02 11:10:00"),
    message: "오케이. 그럼 오늘은 기본 알림 리스트까지 완료하자.",
  },
  {
    id: 27,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-02 11:15:00"),
    message: "알겠어. 디자인도 피그마에 반영해둘게.",
  },
  {
    id: 28,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-02 15:00:00"),
    message: "테스트 서버에 올려놨어. 확인해줄래?",
  },
  {
    id: 29,
    from_user: { id: 1, name: "John Doe" },
    createdAt: new Date("2025-01-02 15:05:30"),
    message: "응, 잘 작동하네. 알림 읽음 처리도 잘 되고.",
  },
  {
    id: 30,
    from_user: { id: 2, name: "Smith" },
    createdAt: new Date("2025-01-02 18:00:00"),
    message: "좋아. 오늘은 여기까지 하고 퇴근하자~",
  },
];

export default messages;
