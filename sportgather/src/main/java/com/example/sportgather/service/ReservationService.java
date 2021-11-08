package com.example.sportgather.service;

import com.example.sportgather.domain.CourtReservation;
import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.User;
import com.example.sportgather.repository.CourtRepository;
import com.example.sportgather.repository.ReservationRepository;
import com.example.sportgather.repository.UserRepository;
import com.example.sportgather.util.MapUtil;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ReservationService {

    private final CourtRepository courtRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public ReservationService(CourtRepository courtRepository, ReservationRepository reservationRepository, UserRepository userRepository) {
        this.courtRepository = courtRepository;
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

    public List<CourtReservation> findAvailableTimeBySport(String sportName){
        // the list that stores all CourtReservation
        List<CourtReservation> ans = new ArrayList<>();

        // all courts name of the selected sportname
        List<String> courtNames = courtRepository.findCourtsBySportName(sportName);
        for (String courtName : courtNames){
            CourtReservation courtReservation = new CourtReservation();
            courtReservation.setCourtName(courtName);
            courtReservation.setAvailableTime(findAvailableTime(courtName));
            ans.add(courtReservation);
        }
        return ans;
    }

    public List<String> findAvailableTime(String courtName){
        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String strDate = dateFormat.format(date).substring(0,10);

        // return all reserved time
        Set<String> reservedSet = new HashSet<>(reservationRepository.findTodayReservation(strDate + "%", courtName));

        // remove reserved time
        Set<String> availableSet = new HashSet<>();
        for (int i = 8; i <= 22; i++){
            String sb = strDate;
            if (i < 10){
                sb += " 0" + i + ":00:00";
            } else {
                sb += strDate + " " + i + ":00:00";
            }
            availableSet.add(sb);
        }

        // get all available time
        availableSet.removeAll(reservedSet);
        List<String> availableTime = new ArrayList<>(availableSet);
        availableTime.sort((String::compareTo));
        return availableTime;
    }
}
