import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TabsContent from "@/components/tabs.content";
import {
  decrement,
  decrementSagaStart,
  increment,
  incrementSagaStart,
} from "@/redux/counter/counter.slide";

const HomePage = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <TabsContent />
      <div>
        <div style={{ textAlign: "center" }}>
          <h3>Count = {count}</h3>
          <div>
            <button
              className="btn btn-success mx-3"
              onClick={() => dispatch(increment())}
            >
              Increase +1
            </button>
            <button
              className="btn btn-warning"
              onClick={() => dispatch(decrement())}
            >
              Decrease -1
            </button>
          </div>
          <div className="mt-5">
            <button
              className="btn btn-secondary mx-3"
              onClick={() => dispatch(incrementSagaStart())}
            >
              Increase Saga +2
            </button>
            <button
              className="btn btn-dark"
              onClick={() => dispatch(decrementSagaStart())}
            >
              Decrease Saga -2
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
