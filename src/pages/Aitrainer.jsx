import { useRef, useEffect, useState } from "react";
import { Pose } from "@mediapipe/pose";
import {
  drawConnectors,
  drawLandmarks,
} from "@mediapipe/drawing_utils";

export default function AITrainer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const exerciseRef = useRef("squat");   // ✅ NEW

  const [exercise, setExercise] = useState("squat");
  const [feedback, setFeedback] = useState("Upload a video to analyze.");
  const [angle, setAngle] = useState("--");

  // ✅ Sync ref with state
  useEffect(() => {
    exerciseRef.current = exercise;
  }, [exercise]);

  const calculateAngle = (a, b, c) => {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (!results.poseLandmarks) return;

      drawConnectors(ctx, results.poseLandmarks, Pose.POSE_CONNECTIONS);
      drawLandmarks(ctx, results.poseLandmarks);

      const lm = results.poseLandmarks;

      const getBestAngle = (a1, b1, c1, a2, b2, c2) => {
        const angle1 = calculateAngle(lm[a1], lm[b1], lm[c1]);
        const angle2 = calculateAngle(lm[a2], lm[b2], lm[c2]);
        return Math.abs(angle1 - 180) < Math.abs(angle2 - 180)
          ? angle1
          : angle2;
      };

      let calculatedAngle = 0;

      // 🏋️ Squat
      if (exerciseRef.current === "squat") {
        calculatedAngle = getBestAngle(24, 26, 28, 23, 25, 27);

        if (calculatedAngle < 100) {
          setFeedback("Great squat depth ✅");
        } else if (calculatedAngle < 120) {
          setFeedback("Almost there ⚠️ Go lower");
        } else {
          setFeedback("Go lower ❌");
        }
      }

      // 💪 Push-up
      if (exerciseRef.current === "pushup") {
        const rightVisibility =
          lm[12].visibility + lm[14].visibility + lm[16].visibility;

        const leftVisibility =
          lm[11].visibility + lm[13].visibility + lm[15].visibility;

        let elbowAngle =
          rightVisibility > leftVisibility
            ? calculateAngle(lm[12], lm[14], lm[16])
            : calculateAngle(lm[11], lm[13], lm[15]);

        calculatedAngle = elbowAngle;

        if (calculatedAngle < 90) {
          setFeedback("Perfect push-up depth ✅");
        } else if (calculatedAngle < 120) {
          setFeedback("Almost there ⚠️ Go lower");
        } else {
          setFeedback("Bend elbows more ❌");
        }
      }

      // 🏋️ Deadlift
      if (exerciseRef.current === "deadlift") {
        const rightHipAngle = calculateAngle(lm[12], lm[24], lm[28]);
        const leftHipAngle = calculateAngle(lm[11], lm[23], lm[27]);

        calculatedAngle = Math.max(rightHipAngle, leftHipAngle);

        if (calculatedAngle > 165) {
          setFeedback("Stand tall at top ✅");
        } else if (calculatedAngle > 140) {
          setFeedback("Good hip hinge position ✅");
        } else {
          setFeedback("Push hips back & keep chest up ⚠️");
        }
      }

      setAngle(Math.round(calculatedAngle));
    });

    poseRef.current = pose;

    const processFrame = async () => {
      if (
        videoRef.current &&
        poseRef.current &&
        videoRef.current.readyState >= 2 &&
        !videoRef.current.paused &&
        !videoRef.current.ended
      ) {
        await poseRef.current.send({
          image: videoRef.current,
        });
      }

      requestAnimationFrame(processFrame);
    };

    processFrame();
  }, []);   // ✅ Keep empty

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const video = videoRef.current;
    video.src = URL.createObjectURL(file);
    video.load();

    setFeedback("Video Loaded. Press Play.");
    setAngle("--");
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        width: "900px",
        background: "#1e293b",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
        🏋️ AI Fitness Trainer
      </h1>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "15px",
        }}
      >
        <select
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px",
          }}
        >
          <option value="squat">Squat</option>
          <option value="pushup">Push-Up</option>
          <option value="deadlift">Deadlift</option>
        </select>

        <input
          type="file"
          accept="video/mp4,video/webm"
          onChange={handleVideoUpload}
          style={{
            flex: 1,
            background: "#334155",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
          }}
        />
      </div>

      {/* Video Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
          marginBottom: "25px",
        }}
      >
        <video
          ref={videoRef}
          controls
          style={{
            width: "100%",
            display: "block",
            borderRadius: "15px",
          }}
          onLoadedMetadata={() => {
            const canvas = canvasRef.current;
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#334155",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h3>Angle</h3>
          <h1 style={{ fontSize: "40px", margin: "10px 0" }}>
            {angle}°
          </h1>
        </div>

        <div
          style={{
            flex: 2,
            background: "#334155",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h3>Feedback</h3>
          <h2 style={{ marginTop: "10px" }}>{feedback}</h2>
        </div>
      </div>
    </div>
  </div>
);

}
