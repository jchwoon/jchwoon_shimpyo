import { useRecoilState } from 'recoil';
import Alarm from '../components/shared/Alarm';
import ReservationMain from '../components/CheckReservation/Main/ReservationMain';
import ReservationHeader from '../components/CheckReservation/Header/ReservationHeader';
import { reviewCompleteAlarmAtoms, reviewModifiedAlarmAtoms } from '../recoil/alarmAtoms';

export default function Reservation() {
  const [isReviewCompleteAlarmOpen, setReviewCompleteAlarmOpen] = useRecoilState(reviewCompleteAlarmAtoms);
  const [isReviewModifiedAlarmOpen, setReviewModifiedAlarmOpen] = useRecoilState(reviewModifiedAlarmAtoms);
  return (
    <>
      <ReservationHeader />
      <ReservationMain />
      {isReviewCompleteAlarmOpen && <Alarm setAlarmState={setReviewCompleteAlarmOpen} message="리뷰가 작성됐습니다!" />}
      {isReviewModifiedAlarmOpen && <Alarm setAlarmState={setReviewModifiedAlarmOpen} message="리뷰가 수정됐습니다!" />}
    </>
  );
}
