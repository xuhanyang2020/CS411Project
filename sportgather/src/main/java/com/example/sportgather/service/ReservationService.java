package com.example.sportgather.service;

import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.User;
import com.example.sportgather.repository.ReservationRepository;
import com.example.sportgather.repository.UserRepository;
import com.example.sportgather.util.MapUtil;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public ReservationService(ReservationRepository reservationRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    public List<Reservation> queryReservationByUserId(String id) {
        List<Reservation> list = reservationRepository.findByPk(id);
        return list;
    }

    public Map<String, Integer> querySportStar(){
        int top = 15;
        Map<String, Integer> map = new HashMap<>();
        List<Reservation> list = reservationRepository.findByAll();

        /* add info into a hashmap to count frequency */
        for (Reservation reservation : list){
            map.put(reservation.getUserId(), map.getOrDefault(reservation.getUserId(), 0) + 1);
        }

        /* priorityqueue for top 15 */
        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>(((o1, o2) -> o1.getValue() - o2.getValue()));
        for (Map.Entry<String, Integer> entry : map.entrySet()){
            if (pq.size() < top){
                pq.add(entry);
            } else if (pq.size() == top && entry.getValue() > pq.peek().getValue()){
                pq.poll();
                pq.add(entry);
            }
        }

        /* res to store the final result*/
        Map<String, Integer> tmp = new HashMap<>();
        while (!pq.isEmpty()){
            Map.Entry<String, Integer> entry = pq.poll();
            User user = userRepository.findUserByPk(entry.getKey());
            tmp.put(user.getFirstName() + " " + user.getLastName(), entry.getValue());
        }
        Map<String, Integer> result = MapUtil.sortByValue(tmp, 1);
        return result;
    }
}
