import { useRef, useEffect, useState } from "react";
import { Pose } from "@mediapipe/pose";
import {
  drawConnectors,
  drawLandmarks,
} from "@mediapipe/drawing_utils";
import "./Aitrainer.css";

export default function AITrainer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const exerciseRef = useRef("squat");

  const [exercise, setExercise] = useState("squat");
  const [feedback, setFeedback] = useState("Upload a video to analyze.");
  const [angle, setAngle] = useState("--");

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

      if (exerciseRef.current === "squat") {
        calculatedAngle = getBestAngle(24, 26, 28, 23, 25, 27);

        if (calculatedAngle < 100) {
          setFeedback("Great squat depth.");
        } else if (calculatedAngle < 120) {
          setFeedback("Almost there. Go lower.");
        } else {
          setFeedback("Go lower.");
        }
      }

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
          setFeedback("Perfect push-up depth.");
        } else if (calculatedAngle < 120) {
          setFeedback("Almost there. Go lower.");
        } else {
          setFeedback("Bend elbows more.");
        }
      }

      if (exerciseRef.current === "deadlift") {
        const rightHipAngle = calculateAngle(lm[12], lm[24], lm[28]);
        const leftHipAngle = calculateAngle(lm[11], lm[23], lm[27]);

        calculatedAngle = Math.max(rightHipAngle, leftHipAngle);

        if (calculatedAngle > 165) {
          setFeedback("Stand tall at top.");
        } else if (calculatedAngle > 140) {
          setFeedback("Good hip hinge position.");
        } else {
          setFeedback("Push hips back and keep chest up.");
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
  }, []);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const video = videoRef.current;
    video.src = URL.createObjectURL(file);
    video.load();

    setFeedback("Video loaded. Press Play.");
    setAngle("--");
  };

  return (
    <div className="ai-trainer-page">
      <h1 className="ai-trainer-title">AI Fitness Trainer</h1>

      <div className="ai-controls">
        <select
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="ai-control-input"
        >
          <option value="squat">Squat</option>
          <option value="pushup">Push-Up</option>
          <option value="deadlift">Deadlift</option>
        </select>

        <input
          type="file"
          accept="video/mp4,video/webm"
          onChange={handleVideoUpload}
          className="ai-control-input"
        />
      </div>

      <div className="ai-video-wrap">
        <video
          ref={videoRef}
          controls
          className="ai-video"
          onLoadedMetadata={() => {
            const canvas = canvasRef.current;
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
          }}
        />

        <canvas
          ref={canvasRef}
          className="ai-canvas"
        />
      </div>

      <div className="ai-stats">
        <div className="ai-stat-box">
          <h3>Angle</h3>
          <h2 className="ai-angle">{angle} deg</h2>
        </div>

        <div className="ai-stat-box">
          <h3>Feedback</h3>
          <h2 className="ai-feedback">{feedback}</h2>
        </div>
      </div>
    </div>
  );
}
