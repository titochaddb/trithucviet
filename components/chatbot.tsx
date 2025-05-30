"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<
        { role: "user" | "assistant"; content: string }[]
    >([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const savedMessages = localStorage.getItem("chatMessages");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    role: "assistant",
                    content: "Trí thức việt xin chào 👋! Tôi có thể giúp gì cho bạn?",
                },
            ]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const systemMessage = {
            role: "system",
            content: `
Bạn là một trợ lý AI hỗ trợ giới thiệu Trung Tâm Dạy Học Trí thức việt. 
Trung tâm dạy từ cấp 1 đến cấp 2 và luyện thi vào lớp 10.

📚 Các lớp học:
- Lớp Toán nâng cao, Lý cơ bản, Văn học hiểu
- Có các lớp luyện thi chuyên Toán, chuyên Văn, chuyên Anh

👨‍🏫 Đội ngũ giáo viên:
- Cô Hạnh: Tiếng Anh lớp 6-9, chuyên Anh vào 10
- Thầy Cường: Văn lớp 6-9, chuyên luyện văn nghị luận, luyện thi văn vào 10
- Thầy Hùng: Toán lớp 6-9, luyện thi toán vào 10

💰 Học phí:
- Lớp thường: 35.000 VNĐ / buổi
- Lớp luyện thi: 40.000 VNĐ / buổi
- Ưu đãi: Đăng ký theo tháng giảm 10%

Bạn cần hỗ trợ trả lời câu hỏi của phụ huynh về lớp học, thời gian, học phí, giáo viên... với thái độ thân thiện và chuyên nghiệp.
        `.trim(),
        };

        const userMsg: { role: "user" | "assistant"; content: string } = { role: "user", content: input };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: [systemMessage, ...newMessages] }),
            });

            const data = await res.json();

            if (res.ok) {
                const botMsg: { role: "user" | "assistant"; content: string } = {
                    role: "assistant",
                    content: data.message.content,
                };
                setMessages((prev) => [...prev, botMsg]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: `Lỗi: ${data.error || "Không rõ"}` },
                ]);
            }
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `Lỗi: ${error.message || "Không rõ"}` },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition"
                    aria-label="Mở chatbot"
                >
                    <MessageCircle className="w-5 h-5" />
                </button>
            )}

            {isOpen && (
                <div className="w-[95vw] max-w-md h-[80vh] sm:w-96 bg-gradient-to-b from-white to-purple-50 border border-purple-300 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white px-4 py-3 flex items-center justify-between">
                        <span className="font-semibold text-lg">Trung tâm trí thức việt</span>
                        <button
                            onClick={() => {
                                setMessages([]);
                                localStorage.removeItem("chatMessages");
                            }}
                            className="text-white hover:text-purple-300 mr-2 text-sm"
                            aria-label="Xóa lịch sử chat"
                        >
                            🗑 Xóa
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-purple-300"
                            aria-label="Đóng chatbot"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto bg-purple-50 text-sm space-y-2">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`p-2 rounded-md max-w-[80%] whitespace-pre-wrap break-words ${msg.role === "user"
                                    ? "bg-purple-200 text-purple-900 self-end ml-auto"
                                    : "bg-white border border-purple-300 text-purple-800 self-start mr-auto"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="p-2 bg-white border border-purple-300 rounded-md max-w-[80%] self-start mr-auto text-purple-600 italic">
                                Bạn vui lòng chờ trong giây lát
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    <div className="p-3 border-t border-purple-300 bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 border border-purple-300 rounded-md p-2 text-sm text-purple-900 outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Nhập tin nhắn..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                disabled={isTyping}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-purple-600 text-white px-4 rounded-md text-sm hover:bg-purple-700 disabled:opacity-50"
                                disabled={isTyping}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
