export function transition (machine, {commit, state, dispatch}, {type, params, callback, extState}) {
	const nextState = machine.transition(state.state, {type, params, callback}, extState);
	commit(`update${machine.config.id}State`, nextState.value);
	nextState.actions.forEach(actionKey => {
		dispatch(actionKey, {type, params, callback, history: nextState.history});
	});
}
